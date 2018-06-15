import * as React from 'react'
import _ from 'lodash'
import Peaks from 'peaks.js'
import faker from 'faker'
import { Flex } from 'reflexbox'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import './Visualizer.scss'
import mp3_file from './sample.mp3'

const audioContext = new AudioContext()
let peaks: any

interface ITranscript {
  startTime: number
  endTime: number
  labelText: string
}

interface IState {
  transcripts: ITranscript[]
}

class Visualizer extends React.Component<{}, IState> {

  public state: IState = {
    transcripts: []
  }

  public componentDidMount() {    
    peaks = Peaks.init({
      audioContext,
      container: document.querySelector('#peaks-container'),
      mediaElement: document.querySelector('audio'),
    })

    let transcriptsGenerated = false
    peaks.on('peaks.ready', () => {
      if (!transcriptsGenerated) {
        const soundDuration = Math.floor(peaks.player.getDuration())
        const generatedTranscripts = this.generateTranscript(soundDuration)
        this.setState({ transcripts: generatedTranscripts })
        transcriptsGenerated = true
      }
    })
  }

  public render() {
    return (
      <div className='App'>
        <div id='peaks-container'/>
        <audio src={mp3_file}/>
        <Flex justify={'center'} p={2}>
          <Button onClick={this.play}>Play</Button>
          <Button onClick={this.pause}>Pause</Button>
        </Flex>
        <Flex column={true}>
          <h2>People names detected in a call</h2>
          {(this.state.transcripts.length > 0) && this.state.transcripts.map(t => <Button onClick={() => this.handleItemClick(t)} key={t.startTime}>{t.labelText}</Button>)}
        </Flex>
      </div>     
    )
  }

  private play = () => {
    peaks.player.play()
  }

  private pause = () => {
    peaks.player.pause()
  }

  private handleItemClick = (t: ITranscript) => {
    peaks.player.playSegment(t)
  }

  private generateTranscript(audioDuration: number) {
    const getRandomDuration = () => _.random(0, 30, false)

    let nextStart = 0
    let segmentDuration = getRandomDuration()
    let gap = getRandomDuration()
    const transcript = []

    while(nextStart + segmentDuration < audioDuration) {
      transcript.push({
        startTime: nextStart,
        endTime: nextStart + segmentDuration,
        labelText: faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}")
      })

      nextStart += segmentDuration + gap
      segmentDuration = getRandomDuration()
      gap = getRandomDuration()
    }

    return transcript
  }
}

export default Visualizer