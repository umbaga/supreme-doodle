-- FUNCTION: public.get_supplemental_descriptions(bigint)

-- DROP FUNCTION public.get_supplemental_descriptions(bigint);

CREATE OR REPLACE FUNCTION public.get_supplemental_descriptions(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(json_build_object(
	'id', d.id,
	'description', d.description,
	'title', get_description(d.id, 2940),
	'orderIndex', ord."orderIndex"
))
FROM adm_core_description d
INNER JOIN adm_link lnk ON lnk."targetId" = d.id
INNER JOIN adm_link titlelnk ON titlelnk."referenceId" = lnk."targetId"
LEFT OUTER JOIN adm_link_order ord ON ord."linkId" = lnk.id
WHERE lnk."referenceId" = $1
AND d."typeId" = 2902

$BODY$;

ALTER FUNCTION public.get_supplemental_descriptions(bigint)
    OWNER TO postgres;
