# CLAUDE.md — Mugen Agency

> Directives opérationnelles pour Claude Code.
> Ce fichier guide Claude dans l'exécution de toutes les tâches Mugen Agency.
> Référencer BUSINESS-PLAN.md, PRICING.md, PROCESS.md et PROSPECTION.md pour le détail.

---

## Contexte

Mugen Agency est une agence web hybride fondée par Kto, 23 ans, auto-entrepreneur basé à Orléans. Seule source de revenus. Temps plein. Objectif : chiffrer et scaler sans plafond.

Positionnement : "J'aide mes clients à être plus visibles et à générer plus."

---

## Site Vitrine Agence (état actuel)

Le site vitrine de Mugen Agency se trouve dans ce dossier. État au 24/03/2026 :

### Fichiers & stack
- `index.html` — page unique (one-page)
- `style.css` — styles complets
- `main.js` — interactions (scroll reveal, FAQ accordion, parallax, tilt cards, formulaire)
- `server.js` — serveur local
- **Stack** : HTML / CSS / JS vanilla (pas de framework)
- **Font** : Plus Jakarta Sans (Google Fonts)
- **Design** : Dark premium, accents violet/purple (`#8b5cf6`), inspiré du template dans `Docs/image.png`

### Sections actives
1. **Hero** — titre centré "L'Excellence Web pour Votre Business / Solutions Sur Mesure.", badge, 2 CTA, cercles clients, 3 mockups navigateur en éventail
2. **Services** — 4 cartes (Site Vitrine, E-Commerce, Applications Web, Référencement SEO) avec icônes SVG
3. **Portfolio** — 4 projets **fictifs** (Château Dumont, UrbanFit, Hôtel Lumière, NovaTech SaaS)
4. **Process** — 4 étapes (Découverte, Design, Développement, Lancement)
5. **Témoignages** — 3 avis **fictifs** (Marie Delacroix, Thomas Martin, Sophie Bernard)
6. **Pricing** — 3 offres (Essentiel 990€, Pro 2 490€, E-Commerce 3 990€) — **tarifs placeholder, non validés**
7. **FAQ** — 6 questions/réponses en accordéon
8. **CTA** — section avec arc glow violet
9. **Contact** — formulaire (prénom, nom, email, type projet, budget, message) + infos contact **fictives**
10. **Footer** — 4 colonnes (brand, services, agence, contact) + socials

### Sections retirées (prévues pour v2)
- Stats bar (150+ projets, 98%, 5 ans, 12 experts) — retiré car pas de vrais chiffres
- Logos clients — retiré car pas de vrais témoignages

### Contenu placeholder à remplacer

| Élément | Valeur actuelle (fictive) | À remplacer par |
|---------|--------------------------|-----------------|
| Nom agence | PixelCraft Studio | **Mugen Agency** |
| Email | hello@pixelcraft.fr | Vrai email de Kto |
| Téléphone | +33 1 23 45 67 89 | Vrai numéro de Kto |
| Adresse | 12 rue du Faubourg, 75008 Paris | Orléans (ou retirer) |
| Portfolio | 4 projets fictifs | Vrais projets quand disponibles |
| Témoignages | 3 faux avis | Vrais avis clients quand disponibles |
| Cercles clients hero | Initiales fictives + "150+ clients" | Retirer ou adapter |
| Mockups URLs | chateau-dumont.fr, urbanfit.fr | Vrais sites ou génériques |
| Tarifs | 990€ / 2 490€ / 3 990€ | **À définir avec Kto** |

> **IMPORTANT — Tarifs** : les tarifs affichés sur le site (990/2490/3990) ET ceux du business plan initial (500/1200/2000 artisans) ne sont pas finalisés. Ne pas utiliser l'un ou l'autre sans validation explicite de Kto.

> **IMPORTANT — Paiement** : la source de vérité est **50% à la commande, 50% à la livraison**. La FAQ du site indique actuellement 30/40/30 — à corriger.

---

## Profil de Kto

- **Forces** : technique (Next.js/React via Claude Code, Shopify), SEO (formé il y a 2-3 ans, besoin de refresh), IA/automatisation, mentalité lean
- **Faiblesses** : vente par téléphone/visio, structuration quotidienne, admin/facturation pas en place
- **Contraintes** : budget limité (~500€/mois max investissement), charges fixes 100-200€/mois, travaille seul sur desktop uniquement
- **Peurs** : trouver des clients régulièrement, éviter la dispersion, rester motivé seul

---

## Verticales & Stack

### Verticale 1 — Artisans BTP
- **Stack** : Next.js + Tailwind + Claude Code (build IA) + Vercel (hébergement gratuit) ou VPS Hostinger
- **Cible** : plombiers, couvreurs, électriciens, maçons
- **Zone** : départements 45, 37, 28, 41, 18, 36
- **Pricing** : Starter 500€ / Pro 1 200€ / Premium 2 000€
- **Maintenance** : Essentiel 49€/mois / Pro 79€/mois
- **Modèle** : démo-first + template réutilisable (1 template Next.js paramétrable par métier/ville)
- **Avantages pivot** : sites ultra rapides, SEO natif (SSR/SSG), build 10x plus rapide avec IA, zéro plugin, zéro maintenance WordPress

### Verticale 2 — E-commerce
- **Stack** : Shopify (programme Partners)
- **Cible** : commerçants locaux, petites marques DNVB, artisans créateurs
- **Pricing** : Lancement 1 500€ / Business 2 500€ / Sur-mesure 3 500€+
- **Accompagnement** : Essentiel 99€/mois / Croissance 199€/mois

---

## Outils actuels

| Outil | Usage | Coût |
|-------|-------|------|
| Hostinger/Vercel | Hébergement sites artisans | Vercel free tier ou Hostinger VPS |
| Claude Pro | IA — copywriting, stratégie, code | Inclus dans 100-200€/mois |
| Rankerfox | SEO — suivi positions | Inclus dans 100-200€/mois |

### Outils en place
- CRM/Prospection : **Mugen Scout** (Next.js local) — import CSV, pipeline, relances auto, devis PDF
- Scraping : Outscraper (free tier) → import CSV dans Mugen Scout
- Email prospection : SMTP intégré dans Mugen Scout

### Outils à mettre en place
- Facturation : Abby (gratuit auto-entrepreneur) — en attente papiers
- Formulaire onboarding : custom ou Google Forms

---

## Directives pour Claude Code

### Langue et ton
- Toujours travailler en **français** sauf indication contraire
- **Tutoiement** dans les échanges internes et entre Kto et Claude
- **Vouvoiement** dans tout ce qui est client-facing (emails, devis, site web)
- Ton professionnel mais accessible — les clients sont des artisans et commerçants, pas des développeurs
- Pas de jargon technique dans les livrables client

### Priorités de travail (dans l'ordre)
1. Ce qui génère du CA immédiatement (prospection, devis, livraison client)
2. Ce qui structure l'agence (process, outils, templates)
3. Ce qui construit l'inbound (SEO, blog, Google Business)
4. Ce qui améliore l'offre (sites démo, portfolio)

### Anti-dispersion
- Kto a tendance à se disperser → toujours recentrer sur les priorités du moment
- Ne jamais lancer un nouveau projet/outil/idée sans avoir terminé ce qui est en cours
- Si Kto propose une nouvelle idée, répondre : "Bonne idée. On la note et on y revient quand [tâche actuelle] est terminée."

---

## Directives par type de contenu

### Copywriting artisans (sites vitrines)
- Accroche orientée bénéfice client : "Plus de clients grâce à votre site", jamais "Nous créons des sites web"
- Intégrer systématiquement : ville + métier dans les titres et méta descriptions
- CTA clair : téléphone cliquable + formulaire de contact
- Avis/témoignages toujours au-dessus du fold si disponibles
- L'artisan doit comprendre en 5 secondes ce qu'il gagne

### Copywriting e-commerce (boutiques Shopify)
- Fiches produit orientées bénéfice, pas description technique
- Structure : hook → bénéfices → preuve sociale → CTA
- SEO produit : titre optimisé, méta description, alt text images

### Pages SEO locales
- Format URL : `/creation-site-[metier]-[ville]`
- H1 : "Création site internet [métier] à [ville] | Mugen Agency"
- Méta description : max 155 caractères, inclure métier + ville + bénéfice
- Contenu : 800-1200 mots, structuré H2/H3
- Toujours inclure : FAQ (3-5 questions), prix indicatif, CTA final
- Maillage interne vers la page service principale et autres pages ville

### Articles de blog
- Cible : artisans et e-commerçants en phase de recherche
- Format : 1 000-1 500 mots, structuré, FAQ en fin d'article
- Types : guides, comparatifs, listes, études de cas
- Toujours un CTA vers la page service ou formulaire de contact
- Production cible : 30-45 min par article avec workflows IA

### Emails de prospection
- Voir PROSPECTION.md pour les templates complets
- Règles : max 80-100 mots par email, 1 seul CTA, objet < 50 caractères, pas de pièce jointe
- Toujours personnaliser avec le prénom, le métier, et la ville
- Ne jamais mentionner de prix dans les emails froids

### Devis / propositions commerciales
- PDF propre, 2-3 pages max
- Structure : contexte → solution → livrables → exclusions → pricing → timeline → prochaines étapes
- Toujours personnaliser avec le nom de l'entreprise et la ville
- Inclure 1-2 captures du site démo ou réalisation similaire

---

## Conditions commerciales (rappel)

- Paiement : 50% à la commande, 50% à la livraison
- Retours : 2 rounds inclus (1 pour Starter), puis 50€/heure
- Nom de domaine : le client achète lui-même (on le guide)
- Délais : démarrent à réception du contenu client
- PV de réception : à signer avant mise en ligne
- Validation tacite : 7 jours sans retour après livraison = validé

---

## Métriques à suivre

### Hebdomadaire
- Emails envoyés (objectif : 20+)
- RDV pris (objectif : 2+)
- Devis envoyés (objectif : 1+)

### Mensuel
- Clients signés
- CA généré (one-shot + récurrent)
- MRR (Monthly Recurring Revenue)
- Pages SEO publiées
- Articles blog publiés
- Source des leads (outbound vs inbound vs bouche à oreille)

### Objectifs M12
| Métrique | Cible |
|----------|-------|
| CA mensuel moyen | 3 000 - 3 500€ |
| Clients cumulés | 30-40 |
| Base récurrente | 15-20 clients |
| MRR | 700 - 1 000€ |
| Pages SEO publiées | 30+ |
| Articles blog publiés | 50+ |
| Part inbound dans les leads | 50-60% |

---

## Rappels critiques

1. **Mugen = seule source de revenus** → la prospection est vitale, jamais passer un jour sans
2. **Site démo artisan = priorité n°1** → builder le template Next.js réutilisable, déployer le premier démo plombier
3. **Facturation pas en place** → obligation légale à résoudre (Abby, en attente papiers)
4. **Vente = point faible** → utiliser les scripts de PROSPECTION.md mot pour mot au début
5. **CRM opérationnel** → Mugen Scout V2 avec import CSV, relances auto, devis PDF
6. **Process de livraison dans la tête** → PROCESS.md est désormais la référence, le suivre étape par étape
7. **Le modèle démo-first est sacré** → ne jamais prospecter un artisan sans site démo à montrer
8. **Pivot full stack** → les sites artisans sont en Next.js (plus WordPress), buildés avec Claude Code
9. **Budget serré** → chaque dépense doit avoir un ROI clair (Vercel free tier pour les démos)
10. **Pas de réseaux sociaux** dans la stratégie actuelle → focus SEO + email + terrain
