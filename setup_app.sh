#!/bin/bash
set -e

echo "=== Kreiranje Ionic/React aplikacije ==="

# Instalacija Ionic CLI ako nije instaliran
if ! command -v ionic &> /dev/null
then
    npm install -g @ionic/cli
fi

# Inicijalizacija praznog Ionic/React projekta (ako folder src ne postoji)
if [ ! -d "src" ]; then
    ionic start . blank --type=react --no-deps --confirm
fi

echo "=== Instalacija paketa ==="
npm install @ionic/react @ionic/react-router ionicons react-router react-router-dom @capacitor/core @capacitor/cli cordova-sqlite-storage

# Kreiranje foldera za screenove
mkdir -p src/screens

# Kreiranje praznih Screen fajlova
for i in {1..5}
do
cat <<EOL > src/screens/Screen$i.tsx
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Screen$i: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Screen $i</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Ovde ide tabela i logika za Screen $i</p>
      </IonContent>
    </IonPage>
  );
};

export default Screen$i;
EOL
done

echo "=== Kreiranje osnovnog routing-a ==="

cat <<EOL > src/App.tsx
import React from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import Screen4 from './screens/Screen4';
import Screen5 from './screens/Screen5';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/screen1" component={Screen1} />
        <Route exact path="/screen2" component={Screen2} />
        <Route exact path="/screen3" component={Screen3} />
        <Route exact path="/screen4" component={Screen4} />
        <Route exact path="/screen5" component={Screen5} />
        <Redirect exact from="/" to="/screen1" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
EOL

echo "=== Kreiranje placeholder SQLite i infinite scroll scaffold ==="

mkdir -p src/services
cat <<EOL > src/services/db.ts
// Ovde ide SQLite inicijalizacija i funkcije za čuvanje podataka
export const initDB = async () => {
  console.log("SQLite scaffold inicijalizovan");
};
EOL

echo "=== Setup završen ==="
