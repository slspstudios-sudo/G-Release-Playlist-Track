public void initUI() {

        //Setting songName Label to center
        songName = new JLabel("", SwingConstants.CENTER);

        //Creating button for selecting a song
        select = new JButton("Select Mp3");

        //Creating Panels
        playerPanel = new JPanel(); //Music Selection Panel
        controlPanel = new JPanel(); //Control Selection Panel

        //Creating icons for buttons
        iconPlay = new ImageIcon("C:\\Users\\DataFlair\\Downloads\\play-button.png");
        iconPause = new ImageIcon("C:\\Users\\DataFlair\\Downloads\\pause-button.png");
        iconResume = new ImageIcon("C:\\Users\\DataFlair\\Downloads\\resume-button.png");
        iconStop = new ImageIcon("C:\\Users\\DataFlair\\Downloads\\stop-button.png");

        //Creating image buttons
        play = new JButton(iconPlay);
        pause = new JButton(iconPause);
        resume = new JButton(iconResume);
        stop = new JButton(iconStop);

        //Setting Layout of PlayerPanel
        playerPanel.setLayout(new GridLayout(2, 1));

        //Addings components in PlayerPanel
        playerPanel.add(select);
        playerPanel.add(songName);

        //Setting Layout of ControlPanel
        controlPanel.setLayout(new GridLayout(1, 4));

        //Addings components in ControlPanel
        controlPanel.add(play);
        controlPanel.add(pause);
        controlPanel.add(resume);
        controlPanel.add(stop);

        //Setting buttons background color
        play.setBackground(Color.WHITE);
        pause.setBackground(Color.WHITE);
        resume.setBackground(Color.WHITE);
        stop.setBackground(Color.WHITE);

        //Initialing the frame
        frame = new JFrame();

        //Setting Frame's Title
        frame.setTitle("DataFlair's Music Player");

        //Adding panels in Frame
        frame.add(playerPanel, BorderLayout.NORTH);
        frame.add(controlPanel, BorderLayout.SOUTH);

        //Setting Frame background color
        frame.setBackground(Color.white);
        frame.setSize(400, 200);
        frame.setVisible(true);
        frame.setResizable(false);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

}
