---
layout: post
title: "PostgreSQL Anonymizer 0.3: In-Place Masking and Anonymous Dumps"
author: Damien Clochard
twitter_id: daamien
github_id: daamien
tags: [PostgreSQL, anonymization, GDPR, masking, Dalibo Labs, PostgreSQL Anonymizer]
---

---

*Paris, September 13th 2019*

`postgresql_anonymizer` is an extension that hides or replaces personally 
identifiable information (PII) or commercially sensitive data from a PostgreSQL 
database.

<!--MORE-->

![]({{ site.baseurl }}/img/PostgreSQL-Anonymizer_H_couleur.png)

First of all, you can declare a list of [Masking Rules] directly inside the database model with SQL comments like this:

```
COMMENT ON COLUMN users.name IS 'MASKED WITH FUNCTION md5(name)';
```

Once the masking rules are declared, anonymization can be acheived in 3 
different ways:

* [Anonymous Dumps] : Simply export the masked data into an SQL file
* [In-Place Anonymization] : Remove the sensible data according to the rules
* [Dynamic Masking] : Hide sensible data, only for the masked users

In addition, various [Masking Functions] are available : randomization, faking,
partial scrambling, shuffling, noise, etc. You can also user your own custom 
function!

For more detail, please take a look at the documentation:
https://postgresql-anonymizer.readthedocs.io/

[Masking Rules]: https://postgresql-anonymizer.readthedocs.io/en/latest/declare_masking_rules/
[Masking Functions]: https://postgresql-anonymizer.readthedocs.io/en/latest/masking_functions/
[Anonymous Dumps]: https://postgresql-anonymizer.readthedocs.io/en/latest/anonymous_dumps/
[In-Place Anonymization]: https://postgresql-anonymizer.readthedocs.io/en/latest/in_place_anonymization/
[Dynamic Masking]: https://postgresql-anonymizer.readthedocs.io/en/latest/dynamic_masking/


How to Install
--------------------------------------------------------------------------------

This extension is officially supported on PostgreSQL 9.6 and later.

It requires extension named [tsm_system_rows] (available in the `contrib` 
package) and an extension called [ddlx] (available via [PGXN]):

```
$ pgxn install ddlx
$ pgxn install postgresql_anonymizer
```

> **WARNING:** The project is at an early stage of development and should be used 
> carefully.

[tsm_system_rows]: https://www.postgresql.org/docs/current/tsm-system-rows.html
[ddlx]: https://github.com/lacanoid/pgddl
[PGXN]: https://pgxn.org/


How to contribute
--------------------------------------------------------------------------------

PostgreSQL Anonymizer is part of the [Dalibo Labs] initiative. It is mainly 
developed by [Damien Clochard].

This is an open project, contributions are welcome. We need your feedback and 
ideas! Let us know what you think of this tool, how it fits your needs and 
what features are missing.

If you want to help, you can find a list of `Junior Jobs` here:

https://gitlab.com/dalibo/postgresql_anonymizer/issues?label_name%5B%5D=Junior+Jobs


[Dalibo Labs]: https://labs.dalibo.com
[Damien Clochard]: https://www.dalibo.com/en/equipe#daamien
