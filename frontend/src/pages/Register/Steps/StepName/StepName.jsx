import React, { useState } from 'react';
import Card from '../../../../components/shared/Card';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from "./StepName.module.css"
import {useDispatch,useSelector} from 'react-redux'
import { setName } from '../../../../store/activateSlice';


const StepName = ({onNext}) =>{
    const { name } = useSelector((state) => state.activate);
    const dispatch = useDispatch();
    const [fullname, setfullname] = useState(name);
    

     function nextStep() {
        if(!fullname){
            return ;
        }

        dispatch(setName(fullname));
        onNext();

    }
    
    return (
        <>
            <div className={styles.cardWrapper}>
                <Card
                    title="What’s your full name?"
                    icon="Emoji"
                >
                    <TextInput
                        value={fullname}
                        onChange={(e) => setfullname(e.target.value)}
                    />
                    <p className={styles.bottomParagraph}>
                    People use real names at codershouse :) 
                    </p>
                    <div className={styles.actionButtonWrap}>
                        <Button onClick={nextStep} text="Next" />
                    </div>
                </Card>
            </div>
        </>
    );
}


export default StepName