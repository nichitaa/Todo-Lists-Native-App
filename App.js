import * as React from 'react';
import {DBProvider} from "./context/DBcontex";
import {Root} from "./root";

import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {
    return (
        <DBProvider>
            <Root/>
        </DBProvider>
    )
}

export default App
