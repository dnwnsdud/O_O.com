import React, { useState, useRef, useEffect } from "react";
import { TabIndicator } from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
} from "@chakra-ui/icons";
import Swiper from "./Swiper";

export default ({
  slidesPerView = 13,
  spaceBetween = 0,
  speed = 500,
  pageChanger = 9,
  onChange = (date) => {},
  ...props
}) => {
  const [date, dateChanger] = useState(new Date());
  const swiper = useRef(null);
  const [isla, islaChanger] = useState(false);
  const [isra, israChanger] = useState(false);
  const [select, selectChanger] = useState(date.getDate() - 1);
  const dates = () => {
    return Array.from(
      {
        length: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
      },
      (v, i) => i + 1
    );
  };
  const dateToName = (now) => {
    const weekday = ["일", "월", "화", "수", "목", "금", "토", "일"];
    const setday = new Date(date.getFullYear(), date.getMonth(), now);
    const today = new Date();
    if (
      today.getFullYear() == setday.getFullYear() &&
      today.getMonth() == setday.getMonth() &&
      today.getDate() == setday.getDate()
    )
      return "오늘";
    return weekday[setday.getDay()];
  };
  useEffect(() => {
    if (swiper?.current?.swiper) {
      swiper?.current?.addEventListener("swiperprogress", () => {
        if (swiper.current.swiper.progress < 0.001) islaChanger(false);
        else islaChanger(true);
        if (swiper.current.swiper.progress > 0.999) israChanger(false);
        else israChanger(true);
      });
    }
  }, []);
  return (
    <div className=" relative">
      <div className="inline-block relative left-1/2 -translate-x-1/2">
        <div className="text-3xl text-center relative flex items-center font-bold">
          {select + 1 == new Date().getDate() &&
          date.getMonth() == new Date().getMonth() ? (
            <span className="text-xs border-2 border-gray-200 rounded-full py-1 px-4 mr-9 text-gray-200">
              최근
            </span>
          ) : (
            <span
              className="cursor-pointer text-xs border-2 border-gray-200 rounded-full py-1 px-4 mr-9"
              onClick={() => {
                const date = new Date();
                selectChanger(date.getDate() - 1);
                dateChanger(date);
                swiper.current.swiper.slideTo(
                  date.getDate() - slidesPerView / 2 < 1
                    ? 0
                    : date.getDate() - slidesPerView / 2
                );
                onChange(date);
              }}
            >
              최근
            </span>
          )}
          <ChevronLeftIcon
            position="relative"
            cursor="pointer"
            onClick={() => {
              dateChanger(
                new Date(
                  date.getFullYear(),
                  date.getMonth() - 1,
                  date.getDate()
                )
              );
              onChange(
                new Date(
                  date.getFullYear(),
                  date.getMonth() - 1,
                  date.getDate()
                )
              );
            }}
          />
          {date.getFullYear()}.
          {date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1}
          <ChevronRightIcon
            position="relative"
            cursor="pointer"
            onClick={() => {
              dateChanger(
                new Date(
                  date.getFullYear(),
                  date.getMonth() + 1,
                  date.getDate()
                )
              );
              onChange(
                new Date(
                  date.getFullYear(),
                  date.getMonth() + 1,
                  date.getDate()
                )
              );
            }}
          />
          <CalendarIcon ml="2.25rem" boxSize={5} cursor="pointer" />
        </div>
      </div>
      <div className="relative w-full mt-8 mx-auto">
        <Swiper
          slides-per-view={slidesPerView}
          space-between={spaceBetween}
          speed={speed}
          initial-slide={
            date.getDate() - slidesPerView / 2 < 1
              ? 0
              : date.getDate() - slidesPerView / 2
          }
          swiper={swiper}
        >
          {dates().map((v, i) => (
            <div
              key={i}
              className="w-full cursor-pointer"
              onClick={() => {
                selectChanger(i);
                onChange(
                  new Date(date.getFullYear(), date.getMonth() + 1, i + 1)
                );
              }}
            >
              {i == select ? (
                <div className="text-center text-xs font-bold text-blue-500">
                  {dateToName(v)}
                </div>
              ) : (
                <div className="text-center text-xs">{dateToName(v)}</div>
              )}
              {i == select ? (
                <div className="text-center text-m font-bold text-blue-500">
                  {v}
                </div>
              ) : (
                <div className="text-center text-m">{v}</div>
              )}
              {i == select ? (
                <div className="w-1/2 h-[0.4rem] bg-blue-500 mt-[0.9rem] mx-auto" />
              ) : (
                <div className="w-full h-[0.1rem] bg-gray-100 mt-[1.2rem]" />
              )}
            </div>
          ))}
        </Swiper>
        {isla ? (
          <ChevronLeftIcon
            bg="white"
            color="black"
            w="1.5rem"
            h="1.5rem"
            // padding="1rem"
            borderRadius="50%"
            boxShadow="0 0 5px -3px black"
            pos="absolute"
            top="50%"
            transform="translate(-50%, -50%)"
            zIndex="49"
            cursor="pointer"
            onClick={() => {
              const target =
                swiper.current.swiper.snapIndex < pageChanger
                  ? 0
                  : swiper.current.swiper.snapIndex - pageChanger;
              swiper.current.swiper.slideTo(target);
            }}
          />
        ) : undefined}
        {isra ? (
          <ChevronRightIcon
            bg="white"
            color="black"
            w="1.5rem"
            h="1.5rem"
            // padding="1rem"
            borderRadius="50%"
            boxShadow="0 0 5px -3px black"
            pos="absolute"
            top="50%"
            right="0"
            transform="translate(50%, -50%)"
            zIndex="49"
            cursor="pointer"
            onClick={() => {
              const target =
                swiper.current.swiper.snapIndex + pageChanger >
                new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
                  ? new Date(
                      date.getFullYear(),
                      date.getMonth() + 1,
                      0
                    ).getDate()
                  : swiper.current.swiper.snapIndex + pageChanger;
              swiper.current.swiper.slideTo(target);
            }}
          />
        ) : undefined}
      </div>
    </div>
  );
};

// import React, { useState, useEffect } from 'react';
// import { Box, Button, Text, Grid, GridItem } from '@chakra-ui/react';
// import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
// import moment from 'moment';

// const Calendar = () => {
//   const [currentMonth, setCurrentMonth] = useState(moment());
//   const [weeks, setWeeks] = useState([]);
//   const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

//   useEffect(() => {
//     updateWeeks(currentMonth);
//   }, [currentMonth]);

//   const updateWeeks = (month) => {
//     const weeksInMonth = getWeeksInMonth(month);
//     setWeeks(weeksInMonth);
//     const todayIndex = weeksInMonth.findIndex(week =>
//       week.some(day => day.isSame(moment(), 'day'))
//     );
//     setCurrentWeekIndex(todayIndex !== -1 ? todayIndex : 0);
//   };

//   const getWeeksInMonth = (month) => {
//     const startOfMonth = month.clone().startOf('month').startOf('week');
//     const endOfMonth = month.clone().endOf('month').endOf('week');
//     let weeks = [];
//     let currentWeek = startOfMonth;

//     while (currentWeek <= endOfMonth) {
//       weeks.push(
//         Array(7).fill(null).map((_, i) => currentWeek.clone().add(i, 'days'))
//       );
//       currentWeek.add(1, 'week');
//     }

//     return weeks;
//   };

//   const handleNextWeek = () => {
//     if (currentWeekIndex + 1 < weeks.length) {
//       setCurrentWeekIndex(currentWeekIndex + 1);
//     } else {
//       setCurrentMonth(currentMonth.clone().add(1, 'month'));
//     }
//   };

//   const handlePrevWeek = () => {
//     if (currentWeekIndex > 0) {
//       setCurrentWeekIndex(currentWeekIndex - 1);
//     } else {
//       setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
//     }
//   };

//   return (
//     <Box>
//       <Box textAlign="center" p="4">
//         <Text fontSize="2xl" fontWeight="bold">
//           {currentMonth.format('YYYY년 MM월')}
//         </Text>
//       </Box>

//       <Grid templateColumns="repeat(9, 1fr)">
//         <Button onClick={handlePrevWeek}><ArrowLeftIcon /></Button>
//         {weeks[currentWeekIndex]?.map((day, i) => (
//           <GridItem key={i} p="2" borderWidth="1px" opacity={day.month() === currentMonth.month() ? 1 : 0.5}
//             fontWeight={day.month() === currentMonth.month() ? "bold" : "normal"}
//             bgColor={day.isSame(moment(), 'day') ? "blue.200" : "transparent"}>
//             <Text textAlign="center">{day.format('D')}</Text>
//           </GridItem>
//         ))}
//         <Button bg="#375472 !important" color="#ffffff" onClick={handleNextWeek}><ArrowRightIcon /></Button>
//       </Grid>
//     </Box>
//   );
// };

// export default Calendar;
