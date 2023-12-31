import { useState, useEffect } from 'react'
import {
  Button,
  Container,
  Box,
  ListItem,
  UnorderedList,
  Divider,
  VStack,
  Heading
} from '@chakra-ui/react'
import { ulid } from 'ulid'

const Schedule = () => {
  const [title, setTitle] = useState('')
  const [list, setList] = useState([])
  const [Message, setMessage] = useState(null)
  const handleChangeTitle = e => {
    setTitle(e.target.value)
  }
  const handleClick = () => {
    if (title !== '') {
      setList([
        ...list,
        {
          id: ulid(),
          title,
          isDone: false
        }
      ])
      setMessage(null)
    } else {
      setMessage('記入して下さい')
    }
    setTitle('')
  }
  const handleDone = e => {
    setList(
      list.map(item => {
        if (item.id === e.target.dataset.id) {
          if (item.isDone === false) {
            return {
              ...item,
              isDone: true
            }
          } else {
            return {
              ...item,
              isDone: false
            }
          }
        } else {
          return {
            ...item
          }
        }
      })
    )
  }
  const handleRemove = e => {
    setList(list.filter(item => item.id !== e.target.dataset.id))
  }
  const handleSave = () => {
    window.localStorage.clear()
    window.localStorage.setItem('schedules', JSON.stringify(list))
  }
  useEffect(() => {
    const localStrageData = window.localStorage.getItem('schedules')
    const localStorage = JSON.parse(localStrageData) ?? []
    setList(localStorage)
  }, [])
  return (
    <Container centerContent p={{ base: '4', md: '6' }} maxWidth='3xl'>
      <Heading>{Message}</Heading>
      <Box>
        <textarea
          onChange={handleChangeTitle}
          type='text'
          name='title'
          value={title}
          placeholder='予定'
          bgColor='white'
          mt='8'
          borderColor='gray.400'
        />
        <Button onClick={handleClick} colorScheme='teal' variant='ghost'>
          追加
        </Button>
        <Button onClick={handleSave} colorScheme='teal' variant='ghost'>
          保存
        </Button>
      </Box>
      <Divider />

      <UnorderedList>
        <VStack>
          {list.map(item => (
            <ListItem key={item.id} as={item.isDone ? 's' : 'none'}>
              {item.title}
              <Button
                onClick={handleDone}
                data-id={item.id}
                colorScheme='teal'
                variant='ghost'
                type='button'
              >
                済
              </Button>
              <Button
                onClick={handleRemove}
                data-id={item.id}
                colorScheme='teal'
                variant='ghost'
                type='button'
              >
                削除
              </Button>
            </ListItem>
          ))}
        </VStack>
      </UnorderedList>
    </Container>
  )
}
export default Schedule
