import * as React from 'react';
import { StyleSheet, Text, View, Image, Alert  } from 'react-native';
//import { OnlineStoreContext } from '../context/onlineStoreContext';  
import { Card, Button, Icon, Divider } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import { SimpleLineIcons } from '@expo/vector-icons'; 

export default class ProductItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          starCount: 3.5
        }
    }

   // static contextType = OnlineStoreContext;

    renderButton() {
      return ( <Button
        icon={
          <Icon
          name='sc-odnoklassniki'
          type='evilicon'
          color='#517fa4'
          size={24}
        />}
        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title='Send' 
        onPress={()=>{Alert.alert("Button Clicked!");}} /> );
    }

    onStarRatingPress(rating) {
      this.setState({
        starCount: rating
      });
    }


    getFullName = () => {
      return this.props.user ? this.props.user.first_name+ " " 
              +this.props.user.last_name : '';
    }

    render(){

      if(!this.props && this.props.user) {
        return (<View ></View>)
      } else{    
        return(
          <View >
          <Card           
            title={this.getFullName()}
            image={{uri: this.props.ip+`/user/${this.props.user.id}/image`}}>
            <StarRating
              disabled={false}
              maxStars={5}
              starSize={22}
              rating={this.state.starCount}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={styles.title}>{this.props.user.email}</Text>           
            <Text style={styles.title}>{this.props.user.age}</Text>
            {this.renderButton()}
          </Card>
          </View>
        )
      }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });