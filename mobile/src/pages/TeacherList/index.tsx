import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Picker } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [featherArrowName, setFeatherArrowName] = useState('arrow-down');
    const [textField, setTextField] = useState('Adicione os filtros para poder ver os proffys');

    const [subject, setSubject] = useState(0);
    const [week_day, setWeek_day] = useState(0);
    const [time, setTime] = useState('');
    const [firstSubject, setFirstSubject] = useState('Selecione');
    const [firstWeek_day, setFirstWeek_day] = useState('Selecione');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
        setFeatherArrowName(isFiltersVisible ? "arrow-down" : "arrow-up");
    }

    async function handleFiltersSubmit() {
        loadFavorites();
        setIsFiltersVisible(!isFiltersVisible);
        setFeatherArrowName(isFiltersVisible ? "arrow-down" : "arrow-up");
        setTextField('Carregando...');

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
        setTextField('');
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton style={styles.borderlessButton} onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                        <Feather name={featherArrowName} size={20} color="#fff" />
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={firstSubject}
                            onValueChange={(itemValue) => {setSubject(itemValue), setFirstSubject(itemValue)}}
                        >
                            <Picker.Item label="Selecione" value={null} />
                            <Picker.Item label="Artes" value="Artes" />
                            <Picker.Item label="Biologia" value="Biologia" />
                            <Picker.Item label="Ciências" value="Ciências" />
                            <Picker.Item label="Educação Física" value="Educação Física" />
                            <Picker.Item label="Geografia" value="Geografia" />
                            <Picker.Item label="História" value="História" />
                            <Picker.Item label="Matemática" value="Matemática" />
                            <Picker.Item label="Português" value="Português" />
                        </Picker>


                        <View style={styles.inputGroup}>
                            <View style={{ width: '40%' }}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <Picker
                                    style={styles.picker}
                                    selectedValue={firstWeek_day}
                                    onValueChange={(itemValue) => {setWeek_day(itemValue), setFirstWeek_day(itemValue)}}
                                >
                                    <Picker.Item label="Selecione" value={null} />
                                    <Picker.Item label="Domingo" value={0} />
                                    <Picker.Item label="Segunda-feira" value={1} />
                                    <Picker.Item label="Terça-feira" value={2} />
                                    <Picker.Item label="Quarta-feira" value={3} />
                                    <Picker.Item label="Quinta-feira" value={4} />
                                    <Picker.Item label="Sexta-feira" value={5} />
                                    <Picker.Item label="Sábado" value={6} />
                                </Picker>
                            </View>
                            
                            <View style={{ width: '55%' }}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder={`Qual horário?\nEx:9:00`}
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )} 
            </PageHeader>

            {textField !== '' ? 
                (
                    <View style={styles.containerText}>
                        <Text style={styles.text}>{textField}</Text>
                    </View>
                ) :
                (
                    <ScrollView
                        style={styles.teacherList}
                        contentContainerStyle={{
                            paddingHorizontal: 16,
                            paddingBottom: 10
                        }}
                    >
                        {teachers.map((teacher: Teacher) => {
                            return (
                                <TeacherItem 
                                    key={teacher.id} 
                                    teacher={teacher}
                                    favorited={favorites.includes(teacher.id)}
                                />
                            )
                        })} 
                    </ScrollView>
                )
            }
            
            
        
            
                
        </View>
    );
}

export default TeacherList;