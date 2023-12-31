import React , {useState} from "react";
import Button from "../../../../components/shared/Button/Button";
import Card from '../../../../components/shared/Card';

import styles from './StepAvatar.module.css'
import {useSelector,useDispatch} from 'react-redux'
import {setAvatar} from '../../../../store/activateSlice'
import { activate } from "../../../../http";
import {setAuth} from "../../../../store/authSlice"


const StepAvatar = ({onNext}) =>{
    const dispatch = useDispatch();

    const {name,avatar} = useSelector((state) => state.activate)

    const [image,setImage] = useState('/images/Ellipse-5.png')

    function captureAvatar(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onloadend = function (){
 
            setImage(reader.result);
            dispatch(setAvatar(reader.result));
        }

    }
     
    async function submit(){
      
        try {
            const {data} = await activate({name,avatar})
            
            if(data.auth){
                dispatch(setAuth(data))
            }
            console.log(data)
            
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
              <Card
                    title={`Okay, ${name} `}
                    icon="Emoji-monkey"
                  >
                    <p className={styles.subheading}>How’s this photo?</p>
                   
                   <div className={styles.avatarWrapper}>
                    <img className={styles.avatarImg} src={image} alt="avatar" />
                   </div>
                   <div>
                    <input onChange={captureAvatar} id="avatarInput" type="file" className={styles.avatarInput} />
                    <label className={styles.avatarLabel} htmlFor="avatarInput">Choose a different image</label>
                   </div>

                    <div className={styles.actionButtonWrap}>
                        <Button onClick={submit} text="Next" />
                    </div>
                </Card>
        </>
    )
}


export default StepAvatar