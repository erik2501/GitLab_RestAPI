Nettsiden

Til dette prosjektet har vi benyttet oss av GitLab sitt eget REST API. Vi har hentet ut informasjon om commits og issues knyttet til et repository, samt implementert filtreringsmetoder på bruker og datoer. Web-applikasjonen er laget slik at brukeren kan koble det opp mot et hvilket som helst repo og få ut info tilhørende dette repoet. Siden er utformet med en navbar der man kan navigere mellom sider som viser innlogging, commits, issues og data/statistikk. 

React

Prosjektet ble laget i React med Typescript, og er satt opp med flere mapper. Components, __test__, styling og pages inneholder komponenter, tester, en  css-fil og routing-sidene respektivt. Vi har brukt react-router-dom biblioteket for å sørge for at siden rendrer riktige komponenter ut fra hva brukeren vil se. Ettersom man ikke faktisk endrer side og det kun er noen komponenter som re-rendres, så blir dette fortsatt en SPA selv om det er flere “sider”.

Det er også en mappe som heter “helpers”, den inneholder to filer, fetches og types. Her ligger alle typene vi har definert og alle metoder for å fetche fra API’et. Ett av kravene for oppgaven var å bruke minst en klasse-komponent, og vi valgte å sette header og footer som klasse-komponenter. 

Vi tar i bruk ulike eksterne biblioteker da noen komponenter krever mye arbeid for å få et velfungerende brukergrensesnitt. Filterbaren er hentet fra Material UI og bar-charten er hentet fra Recharts. Kakediagrammet er en innebygd React komponent, og ikke fra Recharts. Dette er fordi det er en piechart med lite data, og react sin komponent var dermed det enkleste. På et par av MUI-komponentene har vi valgt å bruke inline-styling i stedet for css, da det brukes sx-attributt og ikke style-attributtet.

Informasjon om commits og issues blir fremstilt med cards, inne i en card container. Her har vi valgt å ikke bruke noen bibliotek, men heller lage egne react komponenter, for å kunne personalisere kortene mest mulig, i og med at vi har mye forskjellig informasjon som skal vises. Det var også lettere å tilpasse siden til mobil skjerm ved å bruke flexbox istedenfor Material UI sin card container. 

GitLab

Gjennom utviklingsprosessen har vi brukt verktøyet Gitlab for å samarbeide om kode og ha en oversikt over fremgangen i prosjektet. Oversikt over issues, commits, branches og merges er funksjoner i gitlab som gjør samarbeidet i gruppen lettere. Vi valgte å ha en “main”, en “development”-branch og separate branches til hvert issue. Etter å ha løst et issue merget vi den tilhørende branchen til “development” og merget kun til “main” når produktet var ferdig og fullt funksjonelt. Som konvensjon i gruppen bestemte vi at alle issues skulle bli representert i et board, delt inn i åpne, påbegynte og lukkede issues. For å starte på et issue ble det flyttet over i påbegynt og tildelt en assignee, slik at alle på gruppen hadde oversikt over hva de andre gruppemedlemmene gjorde. Til hvert issue lagde vi en ny branch, og vi forsøkte å lage hvert issue så lite omfattende som mulig og heller ha flere. Dette gjorde det lettere å holde development-branchen så oppdatert som mulig og minimerte merge-konflikter i stor grad. Vi valgte å skrive både issues og commit-meldinger på engelsk, ettersom koden er på engelsk og det gjør kodebasen mer universal. 

Context API

For å sørge for at informasjonen om innlogget bruker/prosjekt flyter mellom de forskjellige komponentene har vi valgt å bruke Context API’et. Dette har vi løst ved at man lager en context som tar inn en useState som inneholder prosjekt-id og access token. Dette gjøres i en Context-provider komponent som ligger rundt alle de andre komponentene våre. De andre komponentene kan så hente denne useStaten ved å kalle funksjonen useLogin som bruker useContext. 

HTML Web Storage

Localstorage: Vi bruker localstorage for å sørge for at dersom man er innlogget, kan man avslutte browseren, åpne den igjen og fortsatt være logget inn. Dette gjør vi ved at localstorage lagrer prosjekt-id og access-token slik at dette kan hentes og sette useState-er når siden starter opp igjen. Localstorage slettes når en bruker logger ut.

Sessionstorage: Vi har implementert HTML session storage for å sørge for at de parametrene du ønsker å filtrere issues på skal være lagret så lenge man er i samme økt. Dette vil i praksis si at dersom man har lagt inn noen parametere på filtrering av issues, men ønsker så å se på commits, kan du gjøre dette uten at du skal trenge å fylle inn parametrene på nytt skulle du ønske å gå tilbake. Merk at når man går tilbake til issues så må man trykke submit for at de lagrede filtrene skal tas i bruk. Du kan fremdeles fjerne filtreringen ved å trykke på clear, og dette vil også skje hvis du går ut fra nettleseren. Vi har valgt å kun implementere lagring av filtrere i issues siden og ikke i commits.

Media queries

Media-queries er blitt tatt i bruk for å sørge for et velfungerende responsivt web design. Ved å legge inn breakpoints sørger vi for at ved en liten skjerm går filtreringskomponenten over til en skuff-komponent som kun vises hvis du trykker på ikonet. Ved å gjøre dette sørger vi for et mer ryddig brukergrensesnitt ved mindre skjermer i motsetning til å klemme alt inn på en liten skjerm. Media-queries anvendes også for å sørge for at stolpegrafen endrer størrelse ved liten skjerm ettersom det valgte grafbiblioteket (reCharts) ikke tilbyr noen klassisk løsning for skalering.
 
Testing

Det er blitt laget tester på card-komponenter for issues og commits. Her blir det gjennomført snapshot-testing av kortene og det blir sjekket at datoen blir formatert riktig. Snapshot-testene sjekker at kortene blir rendret riktig, og at de ikke forandrer på seg uten at det er meningen. Datoene blir formatert slik at de blir på et format som er mer lettleselig, og dette blir sjekket ved å sjekke at en bestemt tekststreng er synlig på kortet. Login siden blir også testet med snapshot-testing og det blir sjekket om ‘Find GIT-repository’ knappen kaster en melding når man prøver å trykke på den uten å ha skrevet inn access token eller prosjekt ID. Dette blir sjekket på samme måte som for dato på kortene. 

For å teste brukergrensesnittet og det responsive designet på nettsiden, har vi brukt funksjonell testing. Da har to personer på gruppen testet siden, før det er blitt merget til development. Dette har blitt gjort i de tilfellene der det har blitt gjort større endringer på siden, for eksempel hvis det har blitt lagt til en komponent. Gruppen har brukt Google Chrome sin innebygde funksjon for å teste det vertikalt og horisontalt på mobil. 

