import React, { useEffect, useState, useCallback } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button } from '@material-ui/core'

import { useRouter } from 'next/router'

interface Row {
  id: string
  title: string
}

const DummyTable = (): JSX.Element => {
  const [rows, setRows] = useState([])

  const router = useRouter()

  useEffect(() => {
    async function fetchRows() {
      const token = localStorage.getItem('token')
      const authHeader = token ? { Authorization: token } : {}
      const response = await fetch('http://localhost:3000/api/table', { headers: authHeader })
      if (response.status === 401) {
        router.push('/')
      } else {
        const json = await response.json()
        const resRows: Row[] = json.rows
        setRows(resRows)
      }
    }
    fetchRows()
  }, [])

  const deleteRowHandler = useCallback((e: React.MouseEvent) => {
    const removedId = e.currentTarget.dataset.id
    const newRows = rows.filter((row) => row.id !== removedId)
    setRows(newRows)
  })

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell align="center">
                <Button
                  type="button"
                  onClick={deleteRowHandler}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  data-id={row.id}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DummyTable
