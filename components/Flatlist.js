import React from 'react';
import { View, FlatList, Text, StyleSheet, Modal, TouchableHighlight, TextInput } from 'react-native';
import { getCoursesFromApi, postCoursesFromApiUpdate, postCoursesFromApiCreate } from '../API/Api';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isModalVisible: false,
            isModalVisibleAdd: false,
            //textInput: '',
            editedItem: 0,
            textInputProduit: '',
            textInputPrix: '',
            textInputUnite: '',
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

    _setModalVisibleAdd = (bool) => {
        this.setState({
            isModalVisibleAdd: bool
        })
    }


    _setTextInput = (produit, prix, unite) => {
        this.setState({
            //textInput: text,
            textInputProduit: produit,
            textInputPrix: prix,
            textInputUnite: unite,
            disableItem: false,
            selectedId: 1,
        })
    }

    _setEditedItem = (item) => {
        this.setState({
            editedItem: item,
           // selectedId: item
        })
    }

    _handleEditItem = (editedItem) => {
        const NewData = this.state.data.map( item => {
            if(item.id === editedItem){
                item.id = editedItem;
                item.produit = this.state.textInputProduit;
                item.prix = this.state.textInputPrix;
                item.unite = this.state.textInputUnite;
                postCoursesFromApiUpdate(item);
                return item;
            }
            return item;
        });
        this.setState({
            data: NewData
        });
    }

    _handleCreateItem = () => {
                let produit = this.state.textInputProduit;
                let prix = this.state.textInputPrix;
                let unite = this.state.textInputUnite;
                postCoursesFromApiCreate(produit, prix, unite);
    }


    _disableItem = (idItem) => {
        const { data } = this.state;
        const newArray = [...data];
        newArray.splice(newArray.findIndex(item=>item.id === idItem), 1);
        this.setState(() => {
            return {
                data: newArray
            }
        })
    }

    _handleUpdate = () => {
        this.forceUpdate();
        
    }

    
    renderItem = ({item}) => {
        //const {selectedId, editedItem} = this.state;
        return (
            <TouchableHighlight onPress={() => {
                this._setModalVisible(true); 
                this._setTextInput(item.produit, item.prix, item.unite);
                this._setEditedItem(item.id);
            }} 
            underlayColor={"#f1f1f1"}
            >
                <View style={styles.item}>
                    <TouchableHighlight
                        onPress={() => {
                            this._disableItem(item.id);
                            
                        }}
                        >
                        <View style={styles.marginLeft}>
                        <MaterialCommunityIcons name="delete-circle-outline" size={40} color="#E3000E" />
                        </View>
                    </TouchableHighlight>
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
        this._loadCourseStart();
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
                <View style={styles.iconAdd}>
                <TouchableHighlight
                    onPress={ ()=>{
                            this._setModalVisibleAdd(true); 
                            //this._setTextInput(item.produit, item.prix, item.unite);
                        }
                    }
                >
                <Ionicons name="ios-add-circle" size={70} color="#953163" />
                </TouchableHighlight>
                </View>
                <FlatList 
                    ListHeaderComponent={header}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id.toString()}
                    refreshing = {this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    />
                {/* modal Update */}
                <Modal animationType="fade" 
                    onRequestClose={() => this._setModalVisible(false)}
                    visible={this.state.isModalVisible}
                    >
                    <View style={styles.modalView}>
                    <Text style={styles.titleModal}>Change</Text>
                        <Text style={styles.labelFieldText}>Nom du produit:</Text>
                        <TextInput 
                            editable={true}
                            multiline={false}
                            maxLength={200}
                            defaultValue={this.state.textInputProduit}
                            onChangeText={(text) => this.setState({ textInputProduit: text })}
                            style={styles.textInput}
                            />
                        <Text style={styles.labelFieldText}>Prix:</Text>
                        <TextInput 
                            editable={true}
                            multiline={false}
                            maxLength={200}
                            defaultValue={this.state.textInputPrix}
                            onChangeText={(text) => this.setState({ textInputPrix: text })}
                            style={styles.textInput}
                            />
                        <Text style={styles.labelFieldText}>Unite de mesure:</Text>
                        <TextInput 
                            editable={true}
                            multiline={false}
                            maxLength={200}
                            defaultValue={this.state.textInputUnite}
                            onChangeText={(text) => this.setState({ textInputUnite: text })}
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
                {/* modal Add */}
                <Modal animationType="fade" 
                    onRequestClose={() => this._setModalVisibleAdd(false)}
                    visible={this.state.isModalVisibleAdd}
                    >
                    <View style={styles.modalView}>
                    <Text style={styles.titleModal}>Ajout d'un produit</Text>
                        <Text style={styles.labelFieldText}>Nom du produit:</Text>
                        <TextInput 
                            editable={true}
                            multiline={false}
                            maxLength={200}
                            onChangeText={(text) => this.setState({ textInputProduit: text })}
                            style={styles.textInput}
                            />
                        <Text style={styles.labelFieldText}>Prix:</Text>
                        <TextInput 
                            editable={true}
                            multiline={false}
                            maxLength={200}
                            onChangeText={(text) => this.setState({ textInputPrix: text })}
                            style={styles.textInput}
                            />
                        <Text style={styles.labelFieldText}>Unite de mesure:</Text>
                        <TextInput 
                            editable={true}
                            multiline={false}
                            maxLength={200}
                            onChangeText={(text) => this.setState({ textInputUnite: text })}
                            style={styles.textInput}
                            />
                        <TouchableHighlight
                        
                            underlayColor={"#f1f1f1"}
                            style={[styles.touchableHighlight, {backgroundColor: 'orange'}]}
                            onPress={() => {
                                this._setModalVisibleAdd(false);
                                this._handleCreateItem();
                                this._loadCourseStart()
                                }
                            }
                        >
                            <Text style={styles.text}>Ajouter</Text>
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
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    labelFieldText: {
        marginLeft: 10,
        fontSize: 18,
        textDecorationLine: 'underline',
        color: '#F04903',
    },
    iconAdd: {
        position: 'absolute',
        zIndex: 10,
        bottom: 20,
        right: 30

    },
    titleModal: {
        flex: 1,
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold' ,
        color: '#F04903',

    }
})