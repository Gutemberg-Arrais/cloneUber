import React, {Component} from 'react';
import { View } from 'react-native';

import { Container, TypeTitle, TypeDescription, TypeImage, RequestButton, RequestButtonText} from './styles';

import uberx from '../../assets/uberx.png';
export default class Details extends Component {
    render() {
        return <Container>
            <TypeTitle>Popular</TypeTitle>
            <TypeDesciption>Viagens baratas para o dia a dia</TypeDesciption>

            <TypeImage source={uberx} />
            <TypeTitle>UberX</TypeTitle>
            <TypeDescription>R$6,00</TypeDescription>

            <RequestButton onPress={() => {}}>
                <RequestButtonText>SOLICITAR UBER</RequestButtonText>
            </RequestButton>
        </Container>;    
    }
}
