-- FUNCTION: public.get_proficiencies_category(bigint)

-- DROP FUNCTION public.get_proficiencies_category(bigint);

CREATE OR REPLACE FUNCTION public.get_proficiencies_category(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$
SELECT CASE WHEN count(ii.id) = 0 THEN null ELSE json_agg(json_build_object('id', ii.id, 'name', ii."itemName", 'count', cnt."count")) END
FROM adm_core_item i
LEFT OUTER JOIN adm_link lnk ON lnk."referenceId" = i.id AND lnk."typeId" = 905
LEFT OUTER JOIN adm_link_count cnt ON cnt."linkId" = lnk.id
LEFT OUTER JOIN adm_core_item ii ON ii.id = lnk."targetId"
WHERE i.id = $1

$BODY$;

ALTER FUNCTION public.get_proficiencies_category(bigint)
    OWNER TO postgres;
