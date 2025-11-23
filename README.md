# Progetto Sito Portfolio Fotografico

## Architettura

### Frontend:

Il framework scelto da utilizzare per questo progetto è Astro.js.

Motivazioni:
* il framework è SEO friendly in quanto utilizza SSG o SSR per il rendering delle pagine a serve time o build time
* Esso consentie eventualmente di integrare altri framework o librerie per la realizzazione delle UI

Styling:
* Visto che il progetto consiste in un portfolio fotografico, il sito risultante dovrà avere un look molto estetico e accattivante, con tanto di animazioni sullo scroll della pagina, sull'hover di componenti visivi (come card dei progetti o dei servizi offerti). Per tanto decidiamo di usare del puro CSS, in modo da avere massimo controllo sullo styling. E' ancora da studiare uno standard di strutturazione dello stile nelle varie parti di markup.

Per quanto riguarda la struttura del sito vero e proprio, decidiamo che sarò presente:
* Una pagina principale alla root "/", che sarà uno scroll delle informazioni principali del portofolio, per tanto nessuna sezione separata in altre pagine. L'unica altra pagina che sarà raggiungibile nel frontend saraà una pagina dedicata all'espozione del singolo progetto, in quanto mostrare interi progetti con tutte le loro immagini nella pagina principale sarebbe troppo corposo; lì mostreremo solo un numero limitato di progetti, con solo la copertina, e al click sulle card di tali progetti, si verrà reindirizzati alle pagine dedicate.

### Backend:
Il backend non sarà un vero e proprio backend con un server all'interno del progetto, ma utilizzeremo gli Endpoint di Astro, ovvero file come projects.js, nella cartella "src/pages/api", che consentiranno di definire delle richieste HTTP di qualsiasi tipo, per operare azioni di lettura e scrittura nella cartella src/data

Tutto ciò che concerne le operazioni di aggiunta, aggiornamento o eliminazione dei progetti e immagini del fotografo, dovranno essere facilmente operabili da una dashboard admin che implementeremo, e le operazioni di associazione delle immagini ai progetti dovranno essere totalmente automatizzate, tramite un drag and drop delle immagini e definizione da form dei progetti.

### Entità Backend:
* Progetto
    * id
    * nome
    * anno
    * descrizione
    * idCopertina
* Media
    * id
    * tipo
    * percorso
    * idProgetto

