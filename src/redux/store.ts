import { configureStore } from '@reduxjs/toolkit'

import weatherInCities from './weatherInCities'

export default configureStore({
    reducer: {
        weatherInCities: weatherInCities
    }
});
