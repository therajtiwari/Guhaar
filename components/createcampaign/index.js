
import { useMoralis } from "react-moralis";
import { useRouter } from 'next/router'
// import styles from "../styles/Home.module.css";
// import SignIn from "../authentication/SignIn";
// import { SignOut } from "../authentication/SignOut";
export default function Home(props) {
//   const { isAuthenticated } = useMoralis();
    const router = useRouter()
    const { id } = router.query
  return (
    <div>
        {/* printing id */}
        {id}
      {/* <div className={styles.backgroundParent}>
        {isAuthenticated ? <SignOut /> : <SignIn />}
      </div> */}
    </div>
  );
}
// /newcampai