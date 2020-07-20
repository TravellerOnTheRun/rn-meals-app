import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderBtn from '../components/HeaderBtn';

import { setFilters } from '../store/actions';
import colors from '../constants/colors';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.name}</Text>
            <Switch
                trackColor={{ true: colors.primary }}
                value={props.value}
                thumbColor={Platform.OS === 'android' ? colors.secondary : ''}
                onValueChange={props.onChange}
            />
        </View>
    );
}

const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback (() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };

        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]);

    useEffect(() => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.mainTitle}>Set Filters</Text>
            <FilterSwitch
                name='Gluten-free'
                value={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                name='Lactose-free'
                value={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
            />
           <FilterSwitch
                name='Vegan'
                value={isVegan}
                onChange={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch
                name='Vegetarian'
                value={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)}
            />
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filters',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderBtn}>
                <Item
                    title='Save'
                    iconName='ios-save'
                    onPress={navData.navigation.getParam('save')} />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    mainTitle: {
        fontSize: 22,
        fontFamily: 'open-sans-bold',
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 20
    }
});

export default FiltersScreen;