/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Visualization from './components/Visualization'
import './App.css'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


// This is the code that may change.
import initJsCode from './viz_dist/basic/init_code.js'
let query = require('./viz_dist/basic/query_response.json')
let data = require('./viz_dist/basic/raw_data.json')
let DEPS = [
  'https://code.jquery.com/jquery-2.2.4.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/d3/4.13.0/d3.js',
]




const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});




const DevApp = () => {
  const [newDeps, setNewDeps] = useState({ current: '', hasChanged: false })
  const [newQuery, setNewQuery] = useState({
    current: '',
    validEntry: '',
    hasChanged: false,
  })
  const [newData, setNewData] = useState({
    current: '',
    validEntry: '',
    hasChanged: false,
  })

  const [tabIndex, setTabIndex] = useState(0)
  const [reloadViz, setReloadViz] = useState(true)

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container spacing={0}>
        <Grid
          item
          xs={10}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{ width: '100%', fontWeight: 'bold', color: '#1565c0' }}
          >
            Looker Custom Visualization Builder
          </Typography>
        </Grid>
      </Grid>

      <Grid spacing={0.5}>

        <Grid item >
          <Tabs value={tabIndex} onChange={onTabClick}>
            <Tab label="Visualization"></Tab>
            <Tab label="Debug"></Tab>
            <Tab label="Other"></Tab>
          </Tabs>
          <div
            style={{ padding: '5px' }}
            hidden={!isTabIndex(tabIndex, 0)}
          >
            <Typography
              variant="h6"
              color="inherit"
              sx={{ color: '#1976d2', paddingLeft: '5px' }}
            >
              Rendered Visualization
            </Typography>
            <Container maxWidth="xl" component="div" id="visWrapper">
              <Visualization
                data={data}
                query={query}
                jsCode={initJsCode}
                deps={DEPS}
                reload={reloadViz}
              />
            </Container>
          </div>

          <div
            style={{ padding: '5px' }}
            hidden={!isTabIndex(tabIndex, 1)}
          >
            Here goes Debug Information
          </div>

          <div
            style={{ padding: '5px' }}
            hidden={!isTabIndex(tabIndex, 2)}
          >
            Here goes other information
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  )

  /** Helper functions */

  function isTabIndex(tabIndex: number, value: number) {
    return value === tabIndex
  }

  function onTabClick(event: any, index: number) {
    setTabIndex(index)
  }

  function getWindowHeight() {
    const { innerHeight } = window
    return innerHeight
  }

  function runVisualization() {
    if (newDeps.hasChanged) {
      try {
        setNewDeps({ current: JSON.parse(newDeps.current), hasChanged: false })
      } catch (e) {
        console.log('Invalid Data. -- Enter valid JSON value for dependencies')
        return
      }
    }

    if (newData.hasChanged) {
      try {
        setNewData({
          ...newData,
          validEntry: JSON.parse(newData.current),
          hasChanged: false,
        })
      } catch (e) {
        console.log('Invalid Raw Data entered')
        return
      }
    }

    if (newQuery.hasChanged) {
      try {
        setNewQuery({
          ...newQuery,
          validEntry: JSON.parse(newQuery.current),
          hasChanged: false,
        })
      } catch (e) {
        console.log('Invalid JSON for Query Response')
        return
      }
    }

    try {
      const iFrame = document.querySelector('iframe')
      iFrame!.remove()
      setReloadViz(reloadViz ? false : true)
    } catch (err) {
      console.log('Using the same dependencies')
    }
  }
}

export default DevApp
