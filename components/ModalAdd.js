import React from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';

export default class ModalAdd extends React.Component {
    
    render(){
        return(
            <Modal animationType="fade" 
            onRequestClose={() => this._setModalVisibleAdd(false)}
            visible={this.state.isModalVisibleAdd}
            >
            <View style={styles.modalView}>
            <Text>Change</Text>
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
                        //this._handleEditItem(this.state.editedItem);
                        }
                    }
                >
                    <Text style={styles.text}>Add</Text>
                </TouchableHighlight>

            </View>
        </Modal>
        )
    }
}

