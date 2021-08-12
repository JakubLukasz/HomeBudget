import styled from "styled-components";
import Card from "../../components/Card";
import TotalWrapper from "./TotalWrapper";
import TransactionsWrapper from "./TransactionsWrapper";
import { useEffect, useState } from "react";
import { devices } from "../../assets/devices";
import { useFirestore } from "../../contexts/FirestoreContext";
import { useLoading } from "../../contexts/LoadingContext";
import { db } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.lightPrimary};
  min-height: 100vh;
  font-size: 1rem;
  padding: 5px 10px 0;

  @media ${devices.mobileM} {
    padding: 10px 15px 0;
  }

  @media ${devices.mobileL} {
    padding: 15px 20px 0;
  }
`;

const Main = () => {
  const { checkIsUserConfigured, getUserData } = useFirestore();
  const [total, setTotal] = useState(null);
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const { setIsLoading } = useLoading();

  const fillUser = async () => {
    const data = await getUserData();
    setTotal(data);
  };

  useEffect(() => {
    const transactionsRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("transactions");
    const unsubscribe = transactionsRef.onSnapshot((snapshot) => {
      if (snapshot.size) {
        const tmp = [];
        snapshot.forEach((doc) => tmp.push(doc.data()));
        tmp.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setTransactions(tmp);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const userRef = db.collection("users").doc(currentUser.uid);
    const unsubscribe = userRef.onSnapshot((doc) => {
      setTotal(doc.data());
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    checkIsUserConfigured();
    fillUser();
  }, []);

  return (
    <Container>
      <Card title="MONEY LEFT">
        <TotalWrapper {...total} />
      </Card>
      <Card title="TRANSACTIONS">
        <TransactionsWrapper transactions={transactions} />
      </Card>
    </Container>
  );
};

export default Main;
