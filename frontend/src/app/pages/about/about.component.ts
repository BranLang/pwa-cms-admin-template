import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import '@material/web/tabs/tabs.js';
import '@material/web/tabs/primary-tab.js';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="about-page">
      <h1>{{ 'menu.about' | translate }}</h1>

      <md-tabs aria-label="About us sections" (change)="selectedTab.set($event.target.activeTabIndex)">
        <md-primary-tab id="company-tab" aria-controls="company-panel">
          O spoločnosti
        </md-primary-tab>
        <md-primary-tab id="services-tab" aria-controls="services-panel">
          Služby
        </md-primary-tab>
        <md-primary-tab id="how-we-build-tab" aria-controls="how-we-build-panel">
          Ako vyrábame
        </md-primary-tab>
        <md-primary-tab id="certs-tab" aria-controls="certs-panel">
          Certifikáty a osvedčenia
        </md-primary-tab>
      </md-tabs>

      <div class="content">
        @if (selectedTab() === 0) {
          <div id="company-panel" role="tabpanel" aria-labelledby="company-tab">
            <h2>O spoločnosti</h2>
            <p>Všetci zamestnanci našej spoločnosti vedia, že väčšina z Vás, našich zákazníkov, stavia len raz za život, a snažia sa pre Vás vyrobiť tomu zodpovedajúcu kvalitu. Spokojnosť zákazníka je našou najsilnejšou motiváciou.</p>
            <p>Naším cieľom je dať Vám a Vášmu domovu najlepší možný výhľad do sveta – dodávame Vášmu domu „oči“. Dbáme na ručne vyrobenú kvalitu a snažíme sa o uspokojenie túžby po individualite, a to všetko za prijateľné ceny.</p>

            <h3>História</h3>
            <p>Spoločnosť JUST SK vznikla 1.1.1990. V začiatkoch bola naša činnosť zameraná na všestranné stolárstvo. Od roku 1993 sme sa začali špecializovať na výrobu interiérových dverí, ku ktorým od roku 1995 pribudli okná a vchodové dvere. Investovali sme do moderných technológií, aby produkty našej spoločnosti vyhovovali vysokým štandardom akosti, spĺňali moderné stavebné normy a Vaše najnáročnejšie požiadavky.</p>
            <p>Od roku 2005 sa vypustila z programu výroba interiérových dverí a spoločnosť sa špecializuje na výrobu a montáž eurookien a vchodových dverí. V roku 2007 sa spoločnosť pretransformovala na JUST SK s.r.o. Spoločnosť aktuálne sídli vo vlastných priestoroch v obci Sľažany, blízko Zlatých Moraviec a zamestnáva ľudí z okolia.</p>

            <h3>Bohaté referencie</h3>
            <p>Drevené a hliníkové okná sa používajú v najrôznejších dizajnových variantoch a sú dôležitým prvkom Vášho domu. Pozrite si naše rozmanité realizácie v referenčných fotografiách.</p>

            <h3>Investovanie do moderných technológií</h3>
            <p>Kvalitatívny vývoj trhu, predpisov, noriem a čoraz náročnejšie požiadavky zákazníkov nás motivovali investovať do moderných technológií. Táto stratégia aj naďalej pre nás zostáva kvalitatívnou podmienkou pre fungovanie na stavebnom trhu.</p>

            <h3>Služby a doplnkový sortiment</h3>
            <p>Neoddeliteľná súčasť našich služieb je dovoz dverí a okien a ich profesionálna montáž. Okrem okien dodávame aj okenice, parapetné dosky, sieťky, rolety, žalúzie.</p>

            <h3>5 ročná záruka</h3>
            <p>Kvalitou našich výrobkov sme si istí. Taktiež nám záleží na Vašej maximálej spokojnosti. Vieme, že práve Vaša spokojnosť nám prináša ďalšie zákazky. Z týchto dôvodov poskytujeme na naše výrobky 5 ročnú záruku. Poskytujeme záručný (bezplatný) a pozáručný servis. Záruka je 5 rokov na všetky výrobky.</p>

            <h3>Certifikácia</h3>
            <p>Naše výrobky spĺňajú náročné kritériá súčasne platných noriem a predpisov, dosvedčujú to aj tieto získané certifikáty.</p>

            <h3>100% poctivá montáž</h3>
            <p>Rovnako dôležitá ako kvalita samotného okna je profesionálna montáž. Preto kladieme veľký dôraz aj na osadenie našich okien. Aby ste nemuseli veriť iba nášmu slovu, sme osvedčení ako poctiví montážnici občianskym združením SLOVENERGOokno podľa STN 733134.</p>
          </div>
        }
        @if (selectedTab() === 1) {
          <div id="services-panel" role="tabpanel" aria-labelledby="services-tab">
            <h2>Služby</h2>
            <h3>Výroba drevených, drevohliníkových, hliníkových, okien a vchodových dverí na mieru</h3>
            <p>Všetky nami vyrábané okná a dvere sú vyrobené na mieru podľa vašich rozmerov stavebných otvorov. Viac v sekcii produkty.</p>
            <h3>Výroba historických okien a dverí na mieru</h3>
            <p>Sme schopní vytvoriť repliky starších okien a dverí na historických budovách (repliky kasňových okien na hradoch, zámkoch, chrámoch, kostoloch a pod.)</p>
            <h3>Montáž okien a dverí</h3>
            <p>Sme držitelia nezávislého certifikátu 100%-tná montáž, ktorá garantuje odbornú montáž okien a dverí. Dodržujeme pravidlá montáže podľa noriem. Viac o poctivej montáži si môžete prečítať tu.</p>
            <h3>Servis okien a dverí</h3>
            <p>Pre našich klientov zabezpečujeme záručný a pozáručný servis na okná a dvere po celom Slovensku. V prípade, ak máte s výrobkami od nás problémy, stačí nás kontaktovať.</p>
          </div>
        }
        @if (selectedTab() === 2) {
          <div id="how-we-build-panel" role="tabpanel" aria-labelledby="how-we-build-tab">
            <h2>Ako vyrábame</h2>
            <p>Sme slovenská výrobná spoločnosť zameraná na výrobu okenných prvkov pre rodinné domy.</p>
            <p>Máme vlastné výrobné priestory a zamestnávame ľudí z regiónu, kde pôsobíme. S našimi zamestnancami sa vždy snažíme vybudovať kvalitný a dlhotrvajúci vzťah.</p>
            <p>Našimi dodávateľmi sú slovenskí drevospracujúci výrobcovia. V niektorých prípadoch na želanie zákazníka nakupujeme aj exotickú drevinu Meranti, ktorá sa využíva na výrobu okien a dverí.</p>
            <h3>Okná a dvere na mieru</h3>
            <p>Okná a dvere Vám pripravíme na mieru na základe Vami dodaných rozmerov a požiadaviek.</p>
            <p>Pri výrobe používame moderné technológie na obrábanie a spracovanie dreva a hliníka. Zabezpečujeme kompletnú výrobu produktu až po montáž a servis. K dispozícií je široká škála farebných odtieňov podľa výberu zákazníka. Zručnosti našich zamestnancov a technológia nám umožňuje vyhotoviť aj historické okná, alebo renováciu kasňových okien. Našimi zákazníkmi sú často hrady, zámky, kaštiele, ktoré sa renovujú a obnovujú pôvodný vzhľad. Pozrite si referencie výroby historických okien.</p>
          </div>
        }
        @if (selectedTab() === 3) {
          <div id="certs-panel" role="tabpanel" aria-labelledby="certs-tab">
            <h2>Certifikáty a osvedčenia</h2>
            <p>Potvrdenie o kvalite našich výrobkov na základe rôznych testov, ako napr. prievzdušnosť, rýchlosť vetra pri 100 km, hnaný dážď, tlakové, bezpečnostné a tepelné skúšky.</p>
            <ul>
              <li>Osvedčenie Illbruck I3</li>
              <li>Montážny pas</li>
              <li>Vyhlásenie zhody</li>
              <li>HS Portál TSÚS certifikácia</li>
              <li>Drevené okná TSÚS certifikácia</li>
              <li>Vchodové dvere TSÚS certifikácia</li>
            </ul>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .about-page {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    
    h1 {
      margin-bottom: 2rem;
    }
    
    .content {
      padding-top: 2rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  selectedTab = signal(0);
}
