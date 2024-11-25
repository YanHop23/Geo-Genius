import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {View, StyleSheet, Image, Text, Button, Platform, Linking} from 'react-native';
import {state} from '../../state'
import CategoryList from './categoryList';


const App = ()=> {
  const [category, setCategory] = useState(0);
  
  
  const changeCategory = (index) => {
    setCategory(index)
  }

  return (
          <CategoryList categoryTable={state.categoryTable} changeCategory={changeCategory}/>
    );
}


export default App;