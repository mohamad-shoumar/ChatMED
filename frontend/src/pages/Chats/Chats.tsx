// import React, { useRef, useState, useEffect } from "react";
// import ChatsSideBar from "../../components/ChatsSideBar/ChatsSideBar";
// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";
// import "firebase/compat/auth";
// import styles from "../../styles/Chats/Chats.module.scss";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";
// import { Query } from "firebase/firestore";
// import { useJwt } from "react-jwt";

// firebase.initializeApp({
//   apiKey: "AIzaSyBoI4VPAgcRYG9DJfLgXN8t97kRLhNgqMY",
//   authDomain: "chats-1258a.firebaseapp.com",
//   projectId: "chats-1258a",
//   storageBucket: "chats-1258a.appspot.com",
//   messagingSenderId: "967691397779",
//   appId: "1:967691397779:web:1d3d6d06b8e39c7757fb66",
//   measurementId: "G-WH6GDS5K8J",
// });

// const firestore: firebase.firestore.Firestore = firebase.firestore();
// const analytics: firebase.analytics.Analytics = firebase.analytics();
// const auth: firebase.auth.Auth = firebase.auth();

// interface MyToken {
//   uid: string;
//   token: string;
// }

// interface Message {
//   text: string;
//   createdAt: firebase.firestore.FieldValue;
//   uid: string;
//   photoURL: string;
//   id: string;
// }

// function Chats() {
//   function useAuthState() {
//     const [user, setUser] = useState<firebase.User | null>(null);
//     const [loading, setLoading] = useState(true);
//     const { decodedToken } = useJwt<MyToken>(
//       localStorage.getItem("token") || ""
//     );
//     useEffect(() => {
//       if (!decodedToken) {
//         setUser(null);
//         setLoading(false);
//         return;
//       }

//       const uid = decodedToken.uid;

//       firebase
//         .auth()
//         .signInWithCustomToken(decodedToken.token)
//         .then((userCredential) => {
//           setUser(userCredential.user);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error(error);
//           setUser(null);
//           setLoading(false);
//         });
//     }, [decodedToken]);

//     return [user, loading];
//   }

//   //     useEffect(() => {
//   //       const token = localStorage.getItem("token");

//   //       if (token) {
//   //         const { decodedToken, isExpired } = useJwt<MyToken>(token);
//   //         if (!decodedToken) return;
//   //         const uid = decodedToken.uid;

//   //         if (!isExpired) {
//   //           firebase
//   //             .auth()
//   //             .signInWithCustomToken(token)
//   //             .then((userCredential) => {
//   //               setUser(userCredential.user);
//   //               setLoading(false);
//   //             })
//   //             .catch((error) => {
//   //               console.error(error);
//   //               setLoading(false);
//   //             });
//   //         } else {
//   //         }
//   //       } else {
//   //         setUser(null);
//   //         setLoading(false);
//   //       }
//   //     }, []);

//   //     return [user, loading];
//   //   }

//   function ChatRoom() {
//     const dummy = useRef<HTMLSpanElement>(null);
//     const messagesRef = firestore.collection("messages");
//     const query: any = messagesRef.orderBy("createdAt").limit(25);

//     // const [messages] = useCollectionData<Message>(query, { idField: "id" });
//     const [messages] = useCollectionData<Message>(query);

//     const [formValue, setFormValue] = useState("");

//     const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();

//       const { uid, photoURL } = firebase.auth().currentUser || {};

//       await messagesRef.add({
//         text: formValue,
//         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//         uid,
//         photoURL,
//       });

//       setFormValue("");
//       dummy.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     return (
//       <>
//         <main>
//           {messages &&
//             messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

//           <span ref={dummy}></span>
//         </main>

//         <form onSubmit={sendMessage}>
//           <input
//             value={formValue}
//             onChange={(e) => setFormValue(e.target.value)}
//             placeholder="say something nice"
//           />

//           <button type="submit" disabled={!formValue}>
//             🕊️
//           </button>
//         </form>
//       </>
//     );
//   }

//   function ChatMessage(props: { message: Message }) {
//     const { text, uid, photoURL } = props.message;

//     const messageClass =
//       uid === firebase.auth().currentUser?.uid ? "sent" : "received";

//     return (
//       <>
//         <div className={`message ${messageClass}`}>
//           <img
//             src={
//               photoURL ||
//               "https://api.adorable.io/avatars/23/abott@adorable.png"
//             }
//           />
//           <p>{text}</p>
//         </div>
//       </>
//     );
//   }

//   return <ChatRoom />;
// }

// export default Chats;
import React from "react";

const Chats = () => {
  return <div>Chats</div>;
};

export default Chats;
