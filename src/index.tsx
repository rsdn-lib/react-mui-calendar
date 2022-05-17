import {
  Card,
  IconButton,
  Stack,
  Typography,
  Box,
  Checkbox
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import React, { useEffect, useState } from 'react'
import RadioIcon from './icons/RadioIcon'
import RadioIconChecked from './icons/RadioCheckedIcon'
import moment from 'moment'

interface DatePickerProps {
  change?: Function
  datesDisabled?: string[]
  times: string[]
  dates: string[]
}

const DatePicker = ({
  change,
  datesDisabled,
  times,
  dates
}: DatePickerProps) => {
  const jpOfWeek = ['水', '木', '金', '土', '日', '月', '火']

  const [week, setWeek] = useState<number>(0)

  const [currentWeeks, setCurrentWeeks] = useState<moment.Moment[]>([])

  useEffect(() => {
    setCurrentWeeks(
      Array(7)
        .fill(0)
        .map((_, idx) =>
          moment().add(week, 'week').startOf('isoWeek').add(idx, 'day')
        )
    )
  }, [week])

  const nextWeek = () => {
    setWeek((week) => week + 1)
  }

  const preWeek = () => {
    setWeek((week) => week - 1)
  }

  const calendarTitle = () => {
    const startOfWeek = moment().add(week, 'weeks').startOf('isoWeek')
    const endOfWeek = moment().add(week, 'weeks').endOf('isoWeek')
    if (startOfWeek.year() === endOfWeek.year()) {
      if (startOfWeek.month() === endOfWeek.month()) {
        return (
          startOfWeek.format('YYYY年MM月DD日') +
          ' - ' +
          endOfWeek.format('DD日')
        )
      } else {
        return (
          startOfWeek.format('YYYY年MM月DD日') +
          ' - ' +
          endOfWeek.format('MM月DD日')
        )
      }
    } else {
      return (
        startOfWeek.format('YYYY年MM月DD日') +
        ' - ' +
        endOfWeek.format('YYYY年MM月DD日')
      )
    }
  }

  const isDateDisabled = (date: moment.Moment, time: string) => {
    if (datesDisabled?.indexOf(date.format('YYYY-MM-DD') + ' ' + time) !== -1) {
      return true
    }
    return false
  }

  const isDateChecked = (date: moment.Moment, time: string) => {
    console.log(dates)
    if (dates.indexOf(date.format('YYYY-MM-DD') + ' ' + time) !== -1) {
      return true
    }
    return false
  }

  const handleDateToggle = (e: any, date: moment.Moment, time: string) => {
    const d = date.format('YYYY-MM-DD') + ' ' + time
    if (e.target.checked) {
      if (change) {
        change([...dates, d])
      }
    } else {
      const dateSelected = dates.find((date) => date === d)
      if (dateSelected) {
        if (change) {
          change([...dates.filter((date) => date !== dateSelected)])
        }
      }
    }
  }

  return (
    <Card variant='outlined'>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <IconButton size='small' onClick={preWeek}>
          <ArrowBackIosNewIcon sx={{ color: '#D2BBA3' }} />
        </IconButton>
        <Typography sx={{ color: '#5C4732' }} fontSize='16px' fontWeight='bold'>
          {calendarTitle()}
        </Typography>
        <IconButton size='small' onClick={nextWeek}>
          <ArrowForwardIosIcon sx={{ color: '#D2BBA3' }} color='primary' />
        </IconButton>
      </Stack>

      <Stack mt={1} border='1px solid #E5E5E5'>
        <Box display='grid' gridTemplateColumns='repeat(24, 1fr)'>
          <Stack
            height='40px'
            gridColumn='span 3'
            bgcolor='#EFEEED'
            alignItems='center'
            justifyContent='center'
            borderRight='1px solid #E5E5E5'
            borderBottom='1px solid #E5E5E5'
          >
            <Typography fontSize='12px'>日時</Typography>
          </Stack>
          {currentWeeks.map((date, index) => (
            <Stack
              key={index}
              height='40px'
              gridColumn='span 3'
              bgcolor='#EFEEED'
              alignItems='center'
              justifyContent='center'
              borderRight={
                currentWeeks.length - 1 === index ? 'none' : '1px solid #E5E5E5'
              }
              borderBottom='1px solid #E5E5E5'
            >
              <Box>
                <Stack alignItems='center'>
                  <Typography component='span' fontSize='12px'>
                    {date.format('DD')}
                  </Typography>
                  <Typography component='span' fontSize='12px'>
                    ({jpOfWeek[index]})
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          ))}
        </Box>
        {times.map((time, timeIndex) => (
          <Box display='grid' gridTemplateColumns='repeat(24, 1fr)' key={time}>
            <Stack
              key={time}
              height='40px'
              gridColumn='span 3'
              alignItems='center'
              justifyContent='center'
              borderRight='1px solid #E5E5E5'
              bgcolor='#EFEEED'
              borderBottom={
                times.length - 1 === timeIndex ? 'none' : '1px solid #E5E5E5'
              }
            >
              <Typography fontSize='12px'>{time}</Typography>
            </Stack>
            {currentWeeks.map((date, index) => (
              <Stack
                key={index}
                height='40px'
                gridColumn='span 3'
                alignItems='center'
                justifyContent='center'
                borderRight={
                  currentWeeks.length - 1 === index
                    ? 'none'
                    : '1px solid #E5E5E5'
                }
                borderBottom={
                  times.length - 1 === timeIndex ? 'none' : '1px solid #E5E5E5'
                }
                bgcolor={isDateDisabled(date, time) ? '#E0E0E0' : 'none'}
              >
                {!isDateDisabled(date, time) && (
                  <Checkbox
                    icon={<RadioIcon />}
                    checkedIcon={<RadioIconChecked />}
                    checked={isDateChecked(date, time)}
                    onChange={(e) => handleDateToggle(e, date, time)}
                  />
                )}
                {isDateDisabled(date, time) && <Typography>-</Typography>}
              </Stack>
            ))}
          </Box>
        ))}
      </Stack>
    </Card>
  )
}

export default DatePicker
