class Input {
  getInfo() {
    return {
      id: 'input',
      name: 'Input',
      color1: '#b1d56c',
      blockIconURI: 'iconURI',
      docsURI: 'https://cocrea.world',
      blocks: [
        
        {
          opcode:'input',
          blockType: Scratch.BlockType.REPORER,
          isTerminal: false,
          blockAllThreads: false,
          text: 'Return [INPUT]',
          func: 'return_input',
        },
      ],
    }
  }

            return_input (args) {return args.INPUT}
          
}
Scratch.extensions.register(new Input())
        