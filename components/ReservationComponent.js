import React, { Component } from "react";
import {Text,View,ScrollView,StyleSheet, Picker, Switch, Button, Modal, Alert} from "react-native";
import {Card} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import {View as AnimatedView} from "react-native-animatable";

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        flex: 2,
        fontSize: 12
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
    },
    modalText: {
         fontSize: 18,
         margin: 10
    }
});


class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }


    handleReservation() {

        const message = `Number of Guests: ${this.state.guests}
Smoking?: ${this.state.smoking ? 'Yes' : "No"}
Date and Time: ${this.state.date}`;

        Alert.alert(
            "Your Reservation OK?",
            message,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => this.resetForm()
                },
                {
                    text: "Ok",
                    style: "default",
                    onPress: () => this.resetForm()
                }
            ]
        );
    }

    resetForm() {
        this.setState({
            quests: 1,
            smoking: false,
            date: '',
        });
    }

    render() {

        return (
            <React.Fragment>
                <AnimatedView animation="zoomIn" duration={2000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker 
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemvalue) => this.setState({guests: itemvalue})}
                            >
                                <Picker.Item label="1" value='1'/>
                                <Picker.Item label="2" value='2'/>
                                <Picker.Item label="3" value='3'/>
                                <Picker.Item label="4" value='4'/>
                                <Picker.Item label="5" value='5'/>
                                <Picker.Item label="6" value='6'/>
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smocking/Non-Smoking?</Text>
                        <Switch 
                            style={styles.formItem}
                            value={this.state.smoking}
                            trackColor="#512DA8"
                            onValueChange={(value) => this.setState({smoking: value})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DatePicker 
                            style={styles.formItem}
                            date={this.state.date}
                            format=''
                            mode="datetime"
                            placeholder='select date and time'
                            minDate='2017-01-01'
                            confirmBtnText='Cancel'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(value) => this.setState({date: value})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            title='Reserve'
                            color='#512DA8'
                            onPress={()=>this.handleReservation()}
                            accessibilityLabel='Lern more about'    
                        />
                    </View>
                </AnimatedView>
            </React.Fragment>
        );

    }

}

export default Reservation;
