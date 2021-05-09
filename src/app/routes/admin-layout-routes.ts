import { Routes } from '@angular/router';

export const BACKEND_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
  },

  {
    path: 'categories',
    loadChildren: () => import('../categorie/categorie.module').then(m => m.CategorieModule)
  },
  {
    path: 'scategories',
    loadChildren: () => import('../scategorie/scategorie.module').then(m => m.ScategorieModule)
  },
  {
    path: 'articles',
    loadChildren: () => import('../article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'fournisseurs',
    loadChildren: () => import('../fournisseur/fournisseur.module').then(m => m.FournisseurModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('../client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'commandes',
    loadChildren: () => import('../commande/commande.module').then(m => m.CommandeModule)
  },
  {
    path: 'approvisionnements',
    loadChildren: () => import('../approvisionnement/approvisionnement.module').then(m => m.ApprovisionnementModule)
  },
  {
    path: 'avoirs',
    loadChildren: () => import('../commande/commande.module').then(m => m.CommandeModule)
  },
  {
    path: 'creances',
    loadChildren: () => import('../creance/creance.module').then(m => m.CreanceModule)
  },
  {
    path: 'devis',
    loadChildren: () => import('../devis/devis.module').then(m => m.DevisModule)
  },
  {
    path: 'ventes',
    loadChildren: () => import('../devis/devis.module').then(m => m.DevisModule)
  },
  {
    path: 'employes',
    loadChildren: () => import('../employe/employe.module').then(m => m.EmployeModule)
  },
  {
    path: 'charges',
    loadChildren: () => import('../charge/charge.module').then(m => m.ChargeModule)
  },
  {
    path: 'contrats',
    loadChildren: () => import('../contrat/contrat.module').then(m => m.ContratModule)
  },
  {
    path: 'versements',
    loadChildren: () => import('../versement/versement.module').then(m => m.VersementModule)
  },
  {
    path: 'tableau',
    loadChildren: () => import('../tableau/tableau.module').then(m => m.TableauModule)
  },
  {
    path: 'chart',
    loadChildren: () => import('../chartJs/chartjs.module').then(m => m.ChartjsModule)
  },

]
