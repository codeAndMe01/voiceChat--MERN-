import React, { useState } from "react";
import styles from "./Rooms.module.css"
import RoomCard from "../../components/shared/RoomCard/RoomCard"
import AddRoomModel from "../../components/shared/AddRoomModel/AddRoomModel";

const rooms = [
    {
        id: 1,
        topic : 'Which framework best for frontend',
        speakers: [
            {
            id:1,
            name:'Jogn-Doe',
            avatar: '/images/user1.png',
            },
            {
            id:2,
            name:'Jogn-Doe',
            avatar: '/images/user2.png',
            }

        ],
        totalPeople: 40
    },
    {
        id: 2,
        topic : 'Which framework best for frontend',
        speakers: [
            {
            id:1,
            name:'Jogn-Doe',
            avatar: '/images/user1.png',
            },
            {
            id:2,
            name:'Jogn-Doe',
            avatar: '/images/user2.png',
            }

        ],
        totalPeople: 40
    },
    {
        id: 3,
        topic : 'Which framework best for frontend',
        speakers: [
            {
            id:1,
            name:'Jogn-Doe',
            avatar: '/images/user1.png',
            },
            {
            id:2,
            name:'Jogn-Doe',
            avatar: '/images/user2.png',
            }

        ],
        totalPeople: 40
    },
    {
        id: 4,
        topic : 'Which framework best for frontend',
        speakers: [
            {
            id:1,
            name:'Jogn-Doe',
            avatar: '/images/user1.png',
            },
            {
            id:2,
            name:'Jogn-Doe',
            avatar: '/images/user2.png',
            }

        ],
        totalPeople: 40
    }
];


const Rooms = () =>{

    const [showModel,setshowModel] = useState(false)

    function openModel(){
        setshowModel(true)
    }

    return (
    <>     
        <div className="container">
            <div className={styles.roomsHeader}>
                <div className={styles.left}>
                    <span className={styles.heading}>All voice rooms</span>
                    <div className={styles.searchBox}>
                        <img src="/images/search.png" alt="search" />  
                        <input type="text" className={styles.searchInput} />
                    </div>        
                </div>
                <div className={styles.right}>
                    <button onClick={openModel} className={styles.startRoomButton}>
                        <img src="/images/Vector.png" alt="" />
                        <span>Start a room</span>
                    </button>
                </div>
            </div>

            <div className={styles.roomsList}>
                {
                    rooms.map((rooms) => (
                        <RoomCard key={rooms.id} room = {rooms}/>
                    ))
                }
                
            </div>
        </div>  

        {showModel && <AddRoomModel  onClose={() => setshowModel(false)}/> }
    </>
    );

}


export default Rooms