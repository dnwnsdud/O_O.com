import { Box } from '@chakra-ui/react';
import React from 'react';
import LoL from '../pages/LoL'
import TopicRequest from '../pages/TopicRequest';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
export default () => {
    //     let data = [
    //     {
    //         name:"iron",
    //         value: 68759 + 54657 + 29669 + 16359,
    //         down:[
    //             {
    //                 name:"i",
    //                 value:68759,
    //             },
    //             {
    //                 name:"ii",
    //                 value:54657,
    //             },
    //             {
    //                 name:"iii",
    //                 value:29669,
    //             },
    //             {
    //                 name:"iv",
    //                 value:16359,
    //                 down:[
    //                     {
    //                         name:"top",
    //                         value:8359
    //                     },
    //                     {
    //                         name:"bottom",
    //                         value:80000
    //                     }
    //                 ]
    //             },
    //         ]
    //     },
    //     {
    //         name:"bronze",
    //         value: 86052+101638+104781+115637,
    //         // down:[
    //         //     {
    //         //         name:"i",
    //         //         value:86052,
    //         //     },
    //         //     {
    //         //         name:"ii",
    //         //         value:101638,
    //         //     },
    //         //     {
    //         //         name:"iii",
    //         //         value:104781,
    //         //     },
    //         //     {
    //         //         name:"iv",
    //         //         value:115637,
    //         //     },
    //         // ]
    //     }
    // ];
    // return <div>
    //     <Downpie
    //         emptyRadius={50}
    //         data={data}
    //         width={900}
    //         height={500}
    //         dataKey="value"
    //         nameKey="name"
    //         downKey="down"
    //         step={[50, 50, 20]}
    //     />
    // </div>
    return <Box bg={"gray.50"}>
        {/* <Header />
        <Main />
        <Footer /> */}
        {/* <LoL /> */}
        {/* <TopicRequest /> */}
        {/* <Signup /> */}
        <Login />
        
    </Box>
}  
