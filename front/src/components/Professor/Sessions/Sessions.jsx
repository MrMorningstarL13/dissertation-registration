import React from 'react'
import Session from './Session'
const dataFromApi = [
    {
        title: "Ai based project",
        student: "John Doe",
        submissionDate: "12/12/2021",
        accepted: true,
        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
    {
        title: "Ai based project2",
        student: "John Doe",
        submissionDate: "12/12/2021",
        accepted: true,

        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
    {
        title: "Ai based project3",
        student: "John Doe",
        submissionDate: "12/12/2021",
        accepted: true,
        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
    {
        title: "Ai based project4",
        student: "John Doe",
        submissionDate: "12/12/2021",
        accepted: true,
        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
    {
        title: "Ai based project5",
        accepted: true,
        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
    {
        title: "Ai based projec6t",
        accepted: true,
        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
    {
        title: "Ai based project7",
        accepted: true,
        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
]
export default function Sessions() {
    return (
        <div>
            {
                dataFromApi.map((session, index) => {
                    return <Session key={index} ></Session>

                })
            }
        </div>
    )
}
