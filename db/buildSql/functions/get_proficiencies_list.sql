-- FUNCTION: public.get_proficiencies_list(bigint, bigint, bigint)

-- DROP FUNCTION public.get_proficiencies_list(bigint, bigint, bigint);

CREATE OR REPLACE FUNCTION public.get_proficiencies_list(
	"itemId" bigint,
	"linkTypeId" bigint,
	"listLinkTypeId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(
	json_build_object(
		'count', lnkcnt."count",
		'proficiencies', get_list_items(lnk."targetId", $3),
		'category', (
			get_item((SELECT prof."categoryId"
				FROM adm_link lnk2
				LEFT OUTER JOIN adm_link lstlnk ON lstlnk."referenceId" = lnk2."targetId"
				LEFT OUTER JOIN adm_def_proficiency prof ON prof."proficiencyId" = lstlnk."targetId"
				WHERE lnk2."referenceId" = $1
				AND lnk2."typeId" = 904
				AND lstlnk."referenceId" = lnk."targetId"
				LIMIT 1))
		)
	)
)
FROM adm_link lnk
LEFT OUTER JOIN adm_link_count lnkcnt ON lnkcnt."linkId" = lnk.id
WHERE lnk."referenceId" = $1
AND lnk."typeId" = $2

$BODY$;

ALTER FUNCTION public.get_proficiencies_list(bigint, bigint, bigint)
    OWNER TO postgres;
