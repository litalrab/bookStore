// routerConfig.ts

import { Routes } from '@angular/router';
import { AdminGaurd } from "./services/admin-gaurd.service";
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { IndexComponent } from './components/index/index.component';
import { HomeComponent } from './components/home/home.component';
import { OriginalComponent } from './components/original/original.component';
import { RomanComponent } from './components/roman/roman.component';
import { ActionComponent } from './components/action/action.component';
import { HistoryComponent } from './components/history/history.component';
import { FantasyComponent } from './components/fantasy/fantasy.component';
import { CinemaComponent } from './components/cinema/cinema.component';
import { BiographyComponent } from './components/biography/biography.component';
import { PoamComponent } from './components/poam/poam.component';
import { AmOvedComponent } from './components/am-oved/am-oved.component';
import { StudyComponent } from './components/study/study.component';
import { KidsYouthComponent } from './components/kids-youth/kids-youth.component';
import { SpareTimeComponent } from './components/spare-time/spare-time.component';
import { CookingComponent } from './components/cooking/cooking.component';
import { DietComponent } from './components/diet/diet.component';
import { FamilyComponent } from './components/family/family.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { LoginComponent } from './components/login/login.component';
import { TranslateComponent } from './components/translate/translate.component';
import { EnglishComponent } from './components/english/english.component';
import { FavouriteProductsComponent } from './components/favourite-products/favourite-products.component';
import { ReligigionComponent } from './components/religigion/religigion.component';
import { HumorComponent } from './components/humor/humor.component';
import { BodyComponent } from './components/body/body.component';
export const appRoutes: Routes = [
  { path: 'body',
  component: BodyComponent
  },
  { path: 'religigion',
  component: ReligigionComponent
  },
  { path: 'humor',
  component: HumorComponent
  },
  { path: 'favourite-products',
  component: FavouriteProductsComponent
  },
  { path: 'Translate',
  component: TranslateComponent
  },
  { path: 'English',
  component: EnglishComponent
  },
   { path: 'login',
  component: LoginComponent
  },
  { path: 'confirmed',
  component: OrderConfirmationComponent
  },
  { path: 'checkout',
  component: CheckoutComponent
  },
  { path: 'shopping-cart',
  component: ShoppingCartComponent
  },
  { path: 'cooking',
  component: CookingComponent
  }, 
   { path: 'Diet',
  component: DietComponent
  }, 
   { path: 'Family',
  component: FamilyComponent
  },
  { path: 'SpareTime',
  component: SpareTimeComponent
  },
  { path: 'KidsYouth',
  component: KidsYouthComponent
  },
  { path: 'Study',
  component: StudyComponent
  },
  { path: 'AmOved',
  component: AmOvedComponent
  },
  { path: 'home',
  component: HomeComponent
  },
  { path: 'original',
  component: OriginalComponent
  },
  { path: 'roman',
    component: RomanComponent
  },
  { path: 'action',
  component: ActionComponent
},
{ path: 'history',
component: HistoryComponent
},
{ path: 'Fantasy',
component: FantasyComponent
},
{ path: 'Biography',
component: BiographyComponent
},
{ path: 'Poam',
component: PoamComponent
},
{ path: 'cinema',
component: CinemaComponent
},
{ path: 'create',
  canActivate: [AdminGaurd],
  component: CreateComponent
},
  {
    path: 'edit/:id',
    component: EditComponent
  },
  { path: 'index',
    component: IndexComponent
  }
];
