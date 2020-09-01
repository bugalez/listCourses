import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Data from './Data';
import { getCoursesFromApi } from '../API/Api';
import { AntDesign } from '@expo/vector-icons';

export default class List extends React.Component {

    constructor(props) {
        super(props);
        this.initData = Data;
        this.state = {
            //data: this.initData
            data: []
        }
    }

    _loadCourseStart(){
        getCoursesFromApi()
        .then(data =>this.setState({
            data: data
        })
            )
    }

    renderItem = ({item}) => {
        return (
        <View style={styles.item}>
            <View style={styles.marginLeft}>
                <AntDesign name="leftcircle" size={24} color="black" />
            </View>
                <Text style={styles.text}>{item.produit}</Text>
        </View>
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
                    <Text style={styles.headerText}>List Header</Text>
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
        borderWidth: 1,
        borderBottomColor: '#e7e7e7',
        alignItems: 'center',
    },
    text: {
        marginVertical: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    marginLeft: {
        marginLeft: 5
    },
    menu: {
        width: 20,
        height: 2,
        backgroundColor: '#111',
        margin: 2,
        borderRadius: 3
    },
    header: {
        height: 60,
        backgroundColor: '#F04903',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'

    }
})