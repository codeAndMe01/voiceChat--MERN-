    import React from "react";

    import styles from './Home.module.css';
    import { Link , useNavigate } from 'react-router-dom';

    import Card from '../../components/shared/Card'

    import Button  from "../../components/shared/Button/Button";



    const Home = () =>{
        const navigate = useNavigate();
    
        const handleButtonClick = () => {
            navigate('./authenticate');
        }
        

        return (
            <div className={styles.cardWrapper}>
            <Card title="Welcome to club-House!" icon="logo">

                <p className={styles.text}>
                We’re working hard to get Codershouse ready for everyone! While we wrap up the finishing youches, we’re adding people gradually to make sure nothing breaks
                 :)
                                    </p>

                <div className={styles.arrow}>
                <Button onClick={handleButtonClick} text="Let's Go" />
                </div>

                <div className={styles.linkWrapper}>
                    <span >Have an invite Link?</span>
                    {/* <Link to="/login">SignIn</Link> */}
                </div>
            </Card>
            
            
            </div>
        )
    }

    export default Home