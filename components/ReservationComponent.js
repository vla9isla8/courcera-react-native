import React, { Component } from "react";
import {Text,View,ScrollView,StyleSheet, Picker, Switch, Button} from "react-native";
import {Card} from "react-native-elements";
import DatePicker from "react-native-datepicker";

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
    }
});


class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quests: 1,
            smoking: false,
            date: ''
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    handleReservation() {
        console.log(this.state);
        this.setState({
            quests: 1,
            smoking: false,
            date: ''
        });
    }

    render() {

        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker 
                        style={styles.formItem}
                        selectedValue={this.state.quests}
                        onValueChange={(itemvalue,itemIndex) => this.setState({quests: itemvalue})}
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
            </ScrollView>
        );

    }

}

export default Reservation;
