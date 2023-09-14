import * as React from 'react';
import {View, useWindowDimensions, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useEffect, useState} from "react";

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}}/>

const SecondRoute = () => <View style={{flex: 1, backgroundColor: '#673ab7'}}/>

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

function TabViewExample() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'First'},
        {key: 'second', title: 'Second'},
    ]);

    useEffect(() => {
        // After setIndex to 1 here. Show `Text` label below to cause TabView to freeze on iOS real devices.
        setIndex(1);
    }, []);

    return (
        <View style={{flex: 1}}>
            {index === 1 && <Text>Second Tab only</Text>}
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
            />
        </View>
    );
}

export default function App(props) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true);
    }, []);
    return <View style={{flex: 1}}>
        {/* This will freeze Tab view */}
        {visible && <TabViewExample/>}
        {/* Not freezing here */}
        {<TabViewExample/>}
    </View>
}
