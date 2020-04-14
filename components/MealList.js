import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from '../components/MealItem';

const MealList = props => {
    const favMeals = useSelector(state => state.favoriteMeals);

    const renderMealItem = itemData => {
        const {
            id,
            title,
            imageUrl,
            duration,
            complexity,
            affordability
        } = itemData.item;

        const isFav = favMeals.find(meal => meal.id === id);

        return <MealItem
            title={title}
            image={imageUrl}
            duration={duration}
            complexity={complexity}
            affordability={affordability}
            onSelectMeal={() => {
                props.navigation.navigate({
                    routeName: 'MealDetails', params: {
                        mealId: id,
                        mealTitle: title,
                        isFav: isFav
                    }
                })
            }}
        />;
    };
    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{ width: '100%' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MealList;