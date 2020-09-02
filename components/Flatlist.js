import React from 'react';
import { View, FlatList, Text, StyleSheet, Modal, TouchableHighlight, TextInput } from 'react-native';
import Data from './Data';
import { getCoursesFromApi } from '../API/Api';
import { AntDesign } from '@expo/vector-icons';

export default class List extends React.Component {

    constructor(props) {
        super(props);
        //this.initData = Data;
        this.state = {
            //data: this.initData,
            data: [],
            isModalVisible: false,
            textInput: '',
            editedItem: 0
        }
    }

    _loadCourseStart(){
        getCoursesFromApi()
        .then(data =>this.setState({
            data: data
        }))
    }
    
    _setModalVisible = (bool) => {
        this.setState({
            isModalVisible: bool
        })
    }


    _setTextInput = (text) => {
        this.setState({
            textInput: text
        })
    }

    _setEditedItem = (item) => {
        this.setState({
            editedItem: item
        })
    }

    _handleEditItem = (editedItem) => {
        const NewData = this.state.data.map( item => {
            if(item.id === editedItem){
                item.produit = this.state.textInput;
                return item;
            }
            return item;
        });
        this.setState({
            data: NewData
        });
    }

    renderItem = ({item}) => {
        return (
        <TouchableHighlight onPress={() => {
            this._setModalVisible(true); 
            this._setTextInput(item.produit);
            this._setEditedItem(item.id);
        }} 
        underlayColor={"#f1f1f1"}
        >
            <View style={styles.item}>
            <View style={styles.marginLeft}>
                <AntDesign name="leftcircle" size={24} color="black" />
            </View>
                <View style={styles.viewItems}>
                    <Text style={[styles.produitText, styles.text]}>{item.produit}</Text>
                </View>
                
                <Text style={[styles.prixText, styles.text]}>{item.prix = item.prix !== null? item.prix: '0,00'}€/</Text>
                <Text style={[styles.uniteText, styles.text]}>{item.unite}</Text>
        </View>
        </TouchableHighlight>
        )
        
    }

    // Charge les elements de l'api au demarrage
    componentDidMount (){
        this._loadCourseStart()
    }    


    render() {
        
        const header = () => {
            return(
                <View style={styles.header}>
                    <Text style={styles.headerText}>Liste des courses</Text>
                </View>
            )
        }

        return(
            <View style={styles.contentContainer}>
                <FlatList 
                    ListHeaderComponent={header}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id.toString()}
                />
                <Modal animationType="fade" 
                    onRequestClose={() => this._setModalVisible(false)}
                    visible={this.state.isModalVisible}
                    >
                    <View style={styles.modalView}>
                        <Text>Change</Text>
                        <TextInput 
                            editable={true}
                            multiline={false}
                            maxLength={200}
                            defaultValue={this.state.textInput}
                            onChangeText={(text) => this.setState({ textInput: text })}
                            style={styles.textInput}
                            />
                        <TouchableHighlight
                        
                            underlayColor={"#f1f1f1"}
                            style={[styles.touchableHighlight, {backgroundColor: 'orange'}]}
                            onPress={() => {
                                this._setModalVisible(false);
                                this._handleEditItem(this.state.editedItem);
                                }
                            }
                        >
                            <Text style={styles.text}>Save</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e7e7e7',
        alignItems: 'center',
        marginHorizontal: 10
        
    },
    text: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#FF7416'
    },
    marginLeft: {
        marginLeft: 0
    },
    menu: {
        width: 20,
        height: 2,
        backgroundColor: '#111',
        margin: 2,
        borderRadius: 3
    },
    header: {
        height: 100,
        backgroundColor: '#F04903',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    viewItems: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    touchableHighlight: {
        backgroundColor: 'white',
        marginVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    textInput: {
        width: '90%',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        borderColor: 'gray',
        borderBottomWidth: 2,
        fontSize: 16
    },
    modalView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
})