import {StatusBar} from 'expo-status-bar';
import {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import * as Permisions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {TextInput} from 'react-native-gesture-handler';
import db from '../config';

export default class TransactionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookId: "",
            studentId: "",
            domState: 'normal',
            hasCameraPermissions: null,
            scanned: false,
            scannedData: ""
        }
    }

    getCameraPermissions = async domState => {
        const {status} = await Permisions.askAsync(Permisions.CAMERA);

        this.setState({
            hasCameraPermissions: status === "grated",
            domState: domState,
            scanned: false
        });
    };

    handleBarCodeScanned = async ({type, data}) => {
        const {domState} = this.state;

        if (domState === "bookId") {
            this.setState({bookId: data, domState: 'normal', scanned: true});
        } else if (domState === "studentId") {
            this.setState({studentId: data, domState: 'normal', scanned: true});
        }
    };

    getBookDetails = bookId => {
        bookId = bookId.trim();
        db.collection("books").where("book_id", "==", bookId).get().theen(snapshot => {
            snapshot.docs.map(doc => {
                this.setState({bookName: doc.data().book_details.book_name});
            });
        });
    };

    getStudentDetails = studentId => {
        studentId = studentId.trim();
        db.collection("students").where("student_id", "==", studentId).get().theen(snapshot => {
            snapshot.docs.map(doc => {
                this.setState({studentName: doc.data().student_details.student_name});
            });
        });
    };

    checkBookAvailablility = async bookId => {
        const bookRef = await db
        .collection("books")
        .where("book_id", "==", bookId)
        .get();

     var transactionType = "";
     if(bookRef.doc.length == 0){
        transactionType = false;
     } else {
       bookRef.doc.map(doc => {
        transactionType = doc.data().is_book_available ? "issue" : "return";
       });
     }
     
     return transactionType;
    }

    checkStudentEligibityForBookIssue = async studentId => {
        const studentRef = await db
        .collection("students")
        .where("student_id", "==", studentId)
        .get()

        var isStudentEligible = '';
        if(studentRef.doc.length == 0){
            this.setState({
                bookId: '',
                studentId: ''
            });
            isStudentEligible = false;
            Alert.alert('O aluno não existe no banco de dados da biblioteca');
        }
        else {
            studentRef.docs.map(doc => {
              if(doc.data().number_of_books_issued < 2){
                isStudentEligible = true;
              } else {
                this.setState({
                    bookId: '',
                    studentId: ''
                });
                isStudentEligible = false;
                Alert.alert('O aluno ja retirou 2 livros');
              }
          });
        }
        return isStudentEligible;  
    };

    checkStudentEligibityForBookReturn = async (bookId, studentId) => {
        const transactionRef = await db
        .collection("transaction")
        .where("book_id", "==", bookId)
        .limit(1)
        .get()

        var isStudentEligible = '';
        transactionRef.docs.map(doc => {
            var lastBookTransaction = doc.data();
            if(lastBookTransaction.student_id === studentId){
                isStudentEligible = true;
            } else {
                this.setState({
                    bookId: '',
                    studentId: ''
                });
                isStudentEligible = false;
                Alert.alert('O livro não está com o aluno');   
            }
        })   
    }



    handleTransaction = async () => {
        var {bookId,studentId} = this.state;
        await this.getBookDetails(bookId);
        await this.getStudentDetails(studentId)

        var transactionType = await this.checkBookAvailablility(bookId);
        
        if(!transactionType){
            this.setState({bookId: '', studentId: ''});
            Alert.alert('o livro não existe na base de base de dados da biblioteca');
        }

            else if (transactionType === 'issue') {
                var isEligible = await this.checkStudentEligibityForBookIssue(studentId)
                if(isEligible){
                    var {bookId,studentId} = this.state;
                    this.initiateBookIssue(bookId, studentId, bookName, studentName);
                    Alert.alert("Livro entregue para o aluno!");   
                }
            }
             else {
                var isEligible = await this.checkStudentEligibityForBookReturn(bookId, studentId);
                if(isEligible){
                    var {bookId,studentId} = this.state;
                    this.initiateBookReturn(bookId, studentId, bookName, studentName);
                    Alert.alert("Livro devolvido para o aluno!");    
                }
            }
    };

    initiateBookIssue = async (bookId, studentId, bookName, studentName) => {
        db.collection("transactions").add({
            student_id: studentId,
            student_name: studentName,
            book_id: bookId,
            book_name: bookName,
            date: firebase.firestore.Timestamp.now().toDate(),
            transaction_type: "issue"
        });
        db.collection("books").doc(bookId).update({is_book_available: false});

        db.collection("students").doc(studentId).update({number_of_books_issued: firebase.firestore.FieldValue.increment(1)});

        this.setState({bookId: "", studentId: ""});

    };

    initiateBookReturn = async (bookId, studentId, bookName, studentName) => {
        db.collection("transactions").add({
            student_id: studentId,
            student_name: studentName,
            book_id: bookId,
            book_name: bookName,
            date: firebase.firestore.Timestamp.now().toDate(),
            transaction_type: "return"
        });
        db.collection("books").doc(bookId).update({is_book_available: false});

        db.collection("students").doc(studentId).update({number_of_books_issued: firebase.firestore.FieldValue.increment(-1)});

        this.setState({bookId: "", studentId: ""});

    };

    render() {
        const {bookId, studentId, domState, scanned} = this.state;
        if (domState !== "normal") {
            return (
                <BarCodeScanner onBarCodeScanned={
                        scanned ? undefined : this.handleBarCodeScanned
                    }
                    style={
                        StyleSheet.absoluteFillObject
                    }/>
            )
        }
        return (
            <KeyboardAvoidingView>
                <View style={
                    styles.container
                }>
                    <View style={
                        styles.textinputContainer
                    }>
                        <TextInput style={
                                styles.textinput
                            }
                            placeholder={'Id Livro'}
                            placeholderTextColor={'#FFFFFF'}
                            value={bookId}
                            onChangeText={text => this.setState({bookId: text})}
                            />
                        <TouchableOpacity style={
                                styles.button
                            }
                            onPress=
                            {() => this.getCameraPermissions("bookId")}>
                            <Text style={
                                styles.buttonText
                            }>Digitalizar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={
                        [
                            styles.textinputContainer, {
                                marginTop: 25
                            }
                        ]
                    }>
                        <TextInput style={
                                styles.textinput
                            }
                            placeholder={'Id Aluno'}
                            placeholderTextColor={'#FFFFFF'}
                            value={studentId}
                            onChangeText={text => this.setState({studentId: text})}
                            />
                        <TouchableOpacity style={
                                styles.button
                            }
                            onPress=
                            {() => this.getCameraPermissions("student'Id")}>
                            <Text style={
                                styles.buttonText
                            }>Digitalizar</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={
                            [
                                styles.button, {
                                    marginTop: 25
                                }
                            ]
                        }
                        onPress={
                            this.handleTransaction
                    }>
                        <Text style={
                            styles.buttonText
                        }>Enviar</Text>
                    </TouchableOpacity>

                </View>

            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: "black",
        fontSize: 30
    },
    button: {
        width: '43%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'cener',
        backgroundColor: 'f48d20',
        boderRadius: 15
    },
    buttonText: {
        fontSize: 24,
        color: '#FFFFFF'
    }
});
