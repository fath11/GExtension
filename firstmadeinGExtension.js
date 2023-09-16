class Test {
  getInfo() {
    return {
      id: 'test',
      name: 'Test',
      color1: '#ff005c',
      blockIconURI: 'iconURI',
      docsURI: 'https://cocrea.world',
      blocks: [

        {
          opcode: 'block',
          blockType: Scratch.BlockType.COMMAND,
          isTerminal: true,
          blockAllThreads: true,
          text: 'Block',
          func: 'geello',
        },
      ],

    };
  };
};
Scratch.extensions.register(new Test())