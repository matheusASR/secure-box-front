// import React from "react";
// import { View, Text, Button, Modal, StyleSheet } from "react-native";

// const CageModal = ({ visible, cage, onClose, onStartStop }) => {
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.container}>
//         <View style={styles.modalView}>
//           <Text style={styles.title}>Gaiola {cage.number}</Text>
//           <Button
//             title="Travar/Iniciar"
//             onPress={onStartStop(cage)}
//           />
//           <Button title="Fechar" onPress={onClose} />
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // cor de fundo semi-transparente
//   },
//   modalView: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//     elevation: 5,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
// });

// export default CageModal;
