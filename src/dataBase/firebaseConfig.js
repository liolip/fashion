// import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
// const firebaseConfig = {
// 	apiKey: 'AIzaSyA0RP5cD6qlpVlP2SU-J_f28yvGn6MOuZQ',
// 	authDomain: 'fashion-e9cb3.firebaseapp.com',
// 	projectId: 'fashion-e9cb3',
// 	storageBucket: 'fashion-e9cb3.appspot.com',
// 	messagingSenderId: '981975763225',
// 	appId: '1:981975763225:web:7d4484abd37cdc261a9d88',
// 	measurementId: 'G-QMSSB2LP1P',
// }
// const app = initializeApp(firebaseConfig)
// const auth = getAuth(app)
// export { auth }
// import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
// import { getFirestore } from 'firebase/firestore' // <-- добавь этот импорт
// const firebaseConfig = {
// 	apiKey: 'AIzaSyA0RP5cD6qlpVlP2SU-J_f28yvGn6MOuZQ',
// 	authDomain: 'fashion-e9cb3.firebaseapp.com',
// 	projectId: 'fashion-e9cb3',
// 	storageBucket: 'fashion-e9cb3.appspot.com',
// 	messagingSenderId: '981975763225',
// 	appId: '1:981975763225:web:7d4484abd37cdc261a9d88',
// 	measurementId: 'G-QMSSB2LP1P',
// }
// const app = initializeApp(firebaseConfig)
// const auth = getAuth(app)
// const db = getFirestore(app) // <--- инициализация Firestore
// export { auth, db } // экспортируй и auth и db
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: 'AIzaSyA0RP5cD6qlpVlP2SU-J_f28yvGn6MOuZQ',
    authDomain: 'fashion-e9cb3.firebaseapp.com',
    projectId: 'fashion-e9cb3',
    storageBucket: 'fashion-e9cb3.appspot.com',
    messagingSenderId: '981975763225',
    appId: '1:981975763225:web:7d4484abd37cdc261a9d88',
    measurementId: 'G-QMSSB2LP1P',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
