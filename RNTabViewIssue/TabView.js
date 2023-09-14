import * as React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import {useEffect, useState} from "react";

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

export function Delayed({ children, waitBeforeShow = 0 }) {
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsShown(true);
        }, waitBeforeShow);
        return () => {
            clearTimeout(timer);
        };
    }, [waitBeforeShow]);

    return isShown ? children : null;
}


export default function TabViewExample() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    useEffect(() => {
        // After setIndex to 1 here. Show `Text` label below to cause TabView to freeze on iOS real devices.
        setIndex(1);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {index === 1 && <Text>Second Tab only</Text>}
           <Delayed>
               <TabView
                   navigationState={{ index, routes }}
                   renderScene={renderScene}
                   onIndexChange={setIndex}
                   initialLayout={{ width: layout.width }}
               />
           </Delayed>
        </View>
    );
}

