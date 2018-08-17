-- FUNCTION: public.get_proficiencies_assigned(bigint)

-- DROP FUNCTION public.get_proficiencies_assigned(bigint);

CREATE OR REPLACE FUNCTION public.get_proficiencies_assigned(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$
SELECT CASE WHEN count(lnk."targetId") = 0 THEN NULL ELSE json_agg(json_build_object(
	'id', profi.id,
	'name', profi."itemName",
	'category', get_item(prof."categoryId")
)) END
FROM adm_core_item i
LEFT OUTER JOIN adm_link lnk ON lnk."referenceId" = i.id AND lnk."typeId" = 907
LEFT OUTER JOIN adm_core_item profi ON profi.id = lnk."targetId"
LEFT OUTER JOIN adm_def_proficiency prof ON prof."proficiencyId" = profi.id
WHERE i.id = $1

$BODY$;

ALTER FUNCTION public.get_proficiencies_assigned(bigint)
    OWNER TO postgres;
