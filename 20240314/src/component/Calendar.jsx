import React, { useState } from 'react';
import { Flex, Box, Button, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';


export default ({ weeks }) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const goPrevWeek = () => {
    setCurrentWeek((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const goNextWeek = () => {
    setCurrentWeek((prev) => (prev < weeks[0].length - 1 ? prev + 1 : weeks[0].length - 1));
  };
  let month = new Date().getMonth()
  console.log(month);

  return (
    <Flex direction="column" align="center" p={5}>
      <Flex justify="space-between" align="center" width="100%" mb={5}>
        <Button onClick={goPrevWeek} size="sm">
          <ChevronLeftIcon />
        </Button>
        <Text fontSize="lg">2024년 {month + 1}월</Text>
        <Button onClick={goNextWeek} size="sm">
          <ChevronRightIcon />
        </Button>
      </Flex>
      <Flex overflow="hidden" width="100%">
        <Flex transform={`translateX(-${currentWeek * 100}%)`} transition="transform 0.3s ease-in-out">
          {weeks[0].map((week, index) => (
            <Box key={index} flex="none" width="100%" display="flex">
              {/* Day boxes go here, one Box for each day of the week */}
              {week.map((day, dayIndex) => (
                <Box key={dayIndex} p={5} borderWidth="1px" borderRadius="lg" flex="1">
                  {/* Date and any additional information */}
                  <Text fontSize="md">{day}</Text>
                </Box>
              ))}
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};