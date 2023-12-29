import React, { useState } from 'react';
import Card from "../../../../../components/shared/Card";
import Button from "../../../../../components/shared/Button/Button";
import TextInput from "../../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css"
import { sendOtp } from '../../../../../http';

import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../../store/authSlice';


const Phone = ({ onNext }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    async function submit() {
        const { data } = await sendOtp({ phone: phoneNumber });
        console.log(data);
        dispatch(setOtp({ phone: data.phone, hash: data.hash }));
        onNext();
    }

    return (
        <Card title="Enter you phone number" icon="Emoji-landline">
            <TextInput
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div>
                <div >
                    <Button text="Next" onClick={submit} />
                </div>
                <p className={styles.bottomParagraph}>
                    By entering your number, you’re agreeing to our Terms of
                    Service and Privacy Policy. Thanks!
                </p>
            </div>
        </Card>
    );
};

export default Phone;