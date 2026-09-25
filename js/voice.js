// Ozan Builder - Sesli Komut Sistemi

const VoiceCommand = {

  recognition: null,

  supported: false,

  init() {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn(
        "Bu tarayıcı sesli komut sistemini desteklemiyor."
      );
      return;
    }

    this.supported = true;

    this.recognition = new SpeechRecognition();

    this.recognition.lang = "tr-TR";
    this.recognition.continuous = false;
    this.recognition.interimResults = false;

    this.recognition.onresult = (event) => {

      const text =
        event.results[0][0].transcript;

      console.log("Sesli komut:", text);

      this.handleCommand(text);

    };

    this.recognition.onerror = (event) => {

      console.error(
        "Sesli komut hatası:",
        event.error
      );

    };

  },

  start() {

    if (!this.supported) {

      alert(
        "Bu tarayıcı sesli komut sistemini desteklemiyor."
      );

      return;
    }

    this.recognition.start();

  },

  handleCommand(text) {

    const command =
      text.toLowerCase().trim();

    console.log(
      "İşlenecek komut:",
      command
    );

    // Buraya ileride yönetici komutları gelecek.
    //
    // Örnek:
    // "Nakil ücretini 150 TL yap"
    //
    // Sistem bunu algılayacak,
    // ilgili makaleyi bulacak,
    // değişikliği hazırlayacak
    // ve yönetici onayına sunacak.

  }

};

window.VoiceCommand = VoiceCommand;
