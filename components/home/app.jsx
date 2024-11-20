import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {View, StyleSheet, Image, Text, Button, Platform, Linking} from 'react-native';
import {state} from '../../state'
import CategoryList from './categoryList';
import { getUsers } from '../../api/ImageApi';


const App = ()=> {
  const [category, setCategory] = useState(0);
  
  
  const changeCategory = (index) => {
    setCategory(index)
  }

  return (
          <CategoryList categoryTable={state.categoryTable} changeCategory={changeCategory}/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        padding: 36,
      },
});

export default App;